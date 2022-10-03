const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  getUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");

const { validarJWT, validarADMIN_ROLE } = require("../middlewares/validar-jwt");

//---------------------------------------------------------------------------------------------------------------------//

const router = Router();

router.get("/", [validarJWT], getUsuarios);

router.post(
  "/crear",
  [
    check("nombre", "Campo nombre es requerido").notEmpty(),
    check("email", "Campo email es requerido").isEmail(),
    check("password", "Campo password es requerido, minimo 6 caracteres, máximo 20").notEmpty().isLength({min:6,max:20}),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE,
    check("nombre", "Campo nombre es requerido").notEmpty(),
    check("email", "Email no valido").isEmail(),
    check("role", "Campo rol requerido").notEmpty(),
    validarCampos,

  ],
  editarUsuario
);

router.delete("/:id",[validarJWT,validarADMIN_ROLE], eliminarUsuario);

module.exports = router;
