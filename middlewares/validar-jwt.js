const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const validarJWT = (req, res, next) => {
  //recupero el valor del token que viene en el header de la request mediante el nombre del header
  const token = req.header("x-token");

  //Validacion de la existencia del token

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay  token en la petición",
    });
  }

  try {
    /*verifica que el token con la funcion verify() la cual me devuelve el payload del token en caso de pasar la verificacion
     */

    const { uid, nombre, email } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    //pasar proiedades del payload del token a la request

    req.uid = uid;
    (req.nombre = nombre), (req.email = email);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: "Token no valido",
    });
  }
};

const validarADMIN_ROLE = async (req, res, next) => {

  const uid = req.uid;
  const actualizar  =  req.params.id
 
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "El usuario no existe",
      });
    }
    if (usuario.role === "USER_ROLE" && uid !==actualizar) {
      return res.status(403).json({
        ok: false,
        message: "Usted no tiene permizo para realizar la acción",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado, contactese con el administrador.",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE,
};
