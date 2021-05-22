/**
 * 
 *  api/todo/:busqueda
 */
 const { validateToken } = require('../middlewares/validate-token');
 const { Router, response } = require('express');
 
 const { getTodo, getDocumentos  } = require('../controllers/busquedas');
 
 
 const router = Router();
 
 router.get('/:busqueda', validateToken ,getTodo);

 router.get('/coleccion/:table/:busqueda', validateToken ,getDocumentos);
 

  
 
 module.exports = router;