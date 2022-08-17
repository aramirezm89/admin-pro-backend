const jwt = require("jsonwebtoken");

const generarJWT = (uid, nombre, email) => {
  const payload = { uid, nombre, email }; // payload es la informacion que conendra el token en este caso id de usuario y nombre.

  /*la funcion sign recibe como primer argumento el payload y como segundo argumento el secretKEy en este caso
    la secretKey se encuentra en el archiv .env (SECRET_JWT_SEED)
    */

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
