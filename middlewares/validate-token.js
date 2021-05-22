
const jwt = require('jsonwebtoken');

const validateToken = ( req, res, next )=>{

    //Leer el token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No token in petition'
        });
    }

    //Verificar token

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();

    } catch (error) {
          console.log(error);
          return res.status(400).json({
              ok:false,
              msg:'Token is invalid'
          });  
    }


   
}

module.exports = {
    validateToken
}