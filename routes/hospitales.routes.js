const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  actualizarHospital,
  crearHospital,
  getHospitales,
  borrarHospital,
} = require("../controllers/hospitales.controller");
//rutas

const router = Router();

router.get("/", getHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es obligatorio").notEmpty(),
    validarCampos
  ],
  crearHospital
);

router.put("/:id", actualizarHospital);

router.delete("/:id", borrarHospital);

module.exports = router;
