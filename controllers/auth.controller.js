const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const googleVerify = require('../helpers/gogoleSingIn-verify');
const { getMenuFrontEnd } = require('../helpers/getMenuFront-end');

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
      ok: true,
      message: "Bienvenido",
      nombre: usuarioDB.nombre,
      token,
      menu:getMenuFrontEnd(usuarioDB.role)
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};


//google sing-in

const googleSingIn = async (req,res) =>{
  const tokenGoogle = req.body.token;
 
try {
  //informacion que retorna gracias a la autenticacion de google
   const {email,picture,name}  = await googleVerify(tokenGoogle);
    

   //verificar si el usuario que intenta hacer login con google existe en la DB
   const usuarioDB = await Usuario.findOne({email});
   let usuario;

   //Si el usuario no existe se crea 
   if(!usuarioDB){
    usuario = new Usuario({
      nombre:name,
      email,
      password:'@@@',
      img:picture,
      google:true
    })
   }else{
    usuario = usuarioDB;
    usuario.google = true;
    
   }

   //guardar usuario
   await usuario.save();

   //generar elJWT

   const token = await generarJWT(usuario.id,usuario.nombre,usuario.email);
   res.json({
     ok: true,
     email,
     picture,
     name,
     token,
     menu: getMenuFrontEnd(usuario.role)
   });
} catch (error) {
  console.log(error)
  res.status(400).json({
    ok:false,
    message:'Token no valido'
  })
}

}

 
const renewToken = async (req, res) => {
  const uid = req.uid;
  const nombre = req.nombre;
  const email = req.email;
  //generar elJWT

  const usuario = await Usuario.findById(uid);

  console.log(usuario)
  const token = await generarJWT(uid,nombre,email);
  res.json({
    ok: true,
    uid,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role),
  });
};

module.exports = {
  login,
  googleSingIn,
  renewToken,
};
