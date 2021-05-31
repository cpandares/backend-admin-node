/**
 * 
 *  api/uploads
 */
 const { validateToken } = require('../middlewares/validate-token');
 const { Router, response } = require('express');

 const expressFileUpload = require('express-fileupload');
 
 const { fileUpload, getImage } = require('../controllers/uploads');
 
 
 const router = Router();
 
 router.use(expressFileUpload());

 router.put('/:type/:id', validateToken, fileUpload);

 router.get('/:type/:img', getImage);
 

  
 
 module.exports = router;