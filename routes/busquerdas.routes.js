const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getTodo,getDocumentosColeccion} = require('../controllers/busquedas.controller')


const router = Router();

router.get('/:query',[validarJWT],getTodo)
router.get('/coleccion/:tabla/:query',[validarJWT],getDocumentosColeccion)


module.exports = router;