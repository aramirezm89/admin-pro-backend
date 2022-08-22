//usar el paquete express-fileupload para realizar subida de archivos
//revisar ejemplo basico  de subida de archivo disponible en la pagina de npm  para comprender el codigo a realizar.

const {Router}  = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {fileUpload,retornaImagen} = require('../controllers/uploads.controller');

const expressfileUpload = require("express-fileupload");


const router = Router();

//gracias a este middleware se puede acceder al archivo
router.use(expressfileUpload());

router.put('/:tipo/:id',[validarJWT],fileUpload);
router.get('/:tipo/:foto',retornaImagen);

module.exports = router;