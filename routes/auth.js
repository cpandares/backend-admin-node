/**
 * 
 *  api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/', [
  
    check('email','Email is Required').isEmail(),
    check('password','Password is Required').notEmpty(),
    validarCampos
 ] ,login);

 router.post('/google', [ 
   
    check('token','Toeken is Required').notEmpty(),
    validarCampos
 ] ,googleSignIn);



module.exports = router;

