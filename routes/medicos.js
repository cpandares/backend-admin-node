/**
 * 
 *  api/medicos
 */


 const { Router, response } = require('express');
 const  { check } = require('express-validator');
 
 const { validateToken } = require('../middlewares/validate-token');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { createMedico, getMedicos, updateMedico,deleteMedico } = require('../controllers/medicos');
 
 const router = Router();
 
 router.get('/', validateToken, getMedicos);
 
 router.post('/', [
    validateToken,
    check("nombre", "Name is required").notEmpty(),
    check("hospital", "Id Hospital is not valid").isMongoId(),
    validarCampos
    
 ] ,createMedico);
 
 
 router.put('/:id', [
    
  ] ,updateMedico);
 
  router.delete('/:id', deleteMedico);
  
 
 module.exports = router;