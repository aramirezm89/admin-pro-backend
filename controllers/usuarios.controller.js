//controlador que se encarga de las funciones correspondientes a los usuarios.
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");



const getUsuarios = async (req, res) => {

  //manejo paginacion 
  const desde = Number(req.query.desde) || 0;

  
  try {
    //listado de usuarios desde la base de datos,
   /*  const usuarios = await Usuario.find({}, "nombre email role google")
      .sort({
        nombre: 1,
      })
      .skip(desde)
      .limit(5);

      const totalRegistros = await Usuario.count() */

    const [usuarios,totalRegistros] =  await Promise.all([
       
       Usuario.find({}, "nombre email role google img")
          .sort({
            nombre: 1,
          })
          .skip(desde)
          .limit(5),

       Usuario.count(),
      ]);

    
    if (usuarios) {
      return res.status(200).json({
        ok: true,
        usuarios,
        totalRegistros
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const crearUsuario = async (req, res) => {
  //atrapo los errores que provengan del midleware check() implementado en la ruta (usuarios.routes.js)

  const { email, password } = req.body;

  try {
    //validar que no exista usuario con el mismo email
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: "El email ya se encuentra registrado en la base de datos.",
      });
    }

    usuario = new Usuario(req.body);

    //encriptar contraseña

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    //generar el JWT

    const token = await generarJWT(usuario.id,usuario.nombre,usuario.email)

    //crear usuario en la BD
    await usuario.save();

    return res.status(200).json({
      ok: true,
      message: "Usuario creado exitosamente",
      usuario,
      token,

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const editarUsuario = async (req, res) => {
  //TODO: Validar token y comprobar si el usuario es correcto

  //tomar id de usuario que vine como parametro en la url

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        message: "Uuario no existe",
      });
    }

    //actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEMail = await Usuario.findOne({ email });
      if (existeEMail) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const eliminarUsuario = async (req, res) =>{

const uid = req.params.id;

try {
  const usuarioDB = await Usuario.findById(uid);

  if (!usuarioDB) {
    return res.status(404).json({
      ok:false,
      message:'No existe usuario con ese id'
    })
  }

  await Usuario.findByIdAndDelete(uid);

  res.json({
    ok:true,
    message:'Usuario eliminado'
  })


} catch (error) {
  console.log(error);
  res.status(500).json({
    ok:false,
    message:'Error inesperado'
  })
}
}
module.exports = {
  getUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario
};
