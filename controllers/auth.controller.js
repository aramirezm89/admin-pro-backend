const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
  const { email, password } =  req.body;

  try {
      
    //varificar email
    const usuarioDB = await Usuario.findOne({email});

    if(!usuarioDB){
        return res.status(404).json({
            ok:false,
            message:'Credenciales no validas'
        })
    }

    //verificar contraseña

    const validPassword = bcrypt.compareSync(password,usuarioDB.password);

    if(!validPassword){
          return res.status(400).json({
            ok: true,
            message:'credenciales de usuario no validas',
          });
    }


    //generar token

    const token = await generarJWT(usuarioDB.id,usuarioDB.nombre,usuarioDB.email)

    return res.status(200).json({
        ok:true,
        message:'Bienvenido',
        token

    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

module.exports = {
  login,
};
