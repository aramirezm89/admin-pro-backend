const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos.controller");

//rutas

const router = Router();

router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").notEmpty(),
    check("hospital","El id del hospital debe ser valida").isMongoId(),
    validarCampos
  ],
  crearMedico
);

router.put("/:id", actualizarMedico);

router.delete("/:id", borrarMedico);

module.exports = router;
