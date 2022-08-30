const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn, renewToken } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio, minimo 6 caracteres máximo 20").notEmpty().isLength({min:6,max:20}),
    validarCampos,
  ],

  login
);


//ruta google sing-in
router.post(
  "/login/google",
  [
    check("token", "El token de google es obligatorio").notEmpty(),
    validarCampos,
  ],

  googleSingIn
);

router.get('/renew',[validarJWT],renewToken)


module.exports = router;
