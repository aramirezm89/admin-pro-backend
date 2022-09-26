const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  getMedicoId,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos.controller");

//rutas

const router = Router();

router.get("/", getMedicos);
router.get("/:id",getMedicoId)

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").notEmpty(),
    check("hospital", "El id del hospital debe ser valida").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio"),
    check("hospital", "El id del hospital debe ser valida").isMongoId(),
    validarCampos
  ],
  actualizarMedico
);

router.delete("/:id",validarJWT, borrarMedico);

module.exports = router;
