

const { Router } = require('express');
const  { check } = require('express-validator');
const { getUsuarios, createUser, updateUser,deleteUser } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateToken, validateAdminRole, validateAdminRoleOrMyUser } = require('../middlewares/validate-token');

const router = Router();

router.get('/', validateToken, validateAdminRole, getUsuarios);

router.post('/', [
   check('nombre','Name is required').notEmpty(),
   check('password','Password is Required').notEmpty(),
   check('email','Email is Required').isEmail(),
   validarCampos
] ,createUser);


router.put('/:id', [
    validateToken,
    validateAdminRoleOrMyUser,
    check('nombre','Name is required').notEmpty(),  
    check('email','Email is Required').isEmail(),
   // check('role','Role is Required').notEmpty(),
    validarCampos
 ] ,updateUser);

 router.delete('/:id', [validateToken, validateAdminRole], deleteUser);
 

module.exports = router;