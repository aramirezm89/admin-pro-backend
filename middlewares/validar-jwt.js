const jwt = require('jsonwebtoken')

const validarJWT = (req,res,next) =>{
  //recupero el valor del token que viene en el header de la request mediante el nombre del header
  const token = req.header("x-token");

  //Validacion de la existencia del token

  if(!token){
    return res.status(401).json({
        ok:false,
        message:'No hay  token en la petición'
    })
  }

  try {
    /*verifica que el token con la funcion verify() la cual me devuelve el payload del token en caso de pasar la verificacion
        */

    const {uid,nombre,email} = jwt.verify(token, process.env.SECRET_JWT_SEED);

    //pasar proiedades del payload del token a la request

    req.uid = uid;
    req.nombre = nombre,
    req.email = email;

    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({
        ok:false,
        message:'Token no valido'
    })

  }


}

module.exports = {
    validarJWT
}