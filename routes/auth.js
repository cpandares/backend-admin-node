/**
 * 
 *  api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateToken } = require('../middlewares/validate-token');

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


 router.get('/renew', [ 
   
   validateToken
] ,renewToken);





module.exports = router;

