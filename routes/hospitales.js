/**
 * 
 *  api/usuarios
 */


const { Router, response } = require('express');
const  { check } = require('express-validator');

const { validateToken } = require('../middlewares/validate-token');
const { validarCampos } = require('../middlewares/validar-campos');

const { createHospital, getHospitales, updateHospital,deleteHospital  } = require('../controllers/hospitales');

const router = Router();

router.get('/',validateToken, getHospitales);

router.post('/', [
   validateToken,
   check('nombre', 'Name Hospital is Required').notEmpty(),
   validarCampos   
] ,createHospital);


router.put('/:id', [
   validateToken,
   check('nombre', 'Name Hospital is Required').notEmpty(),
   validarCampos    
 ] ,updateHospital);

 router.delete('/:id',validateToken, deleteHospital);
 

module.exports = router;