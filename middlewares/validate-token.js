
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

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


const validateAdminRole = async ( req,res, next )=>{

    const uid = req.uid;

    try {

        const userDb = await Usuario.findById(uid);

        if(!userDb){
            return res.status(404).json({
                ok:false,
                msg:'User not found'
            })
        }

        if(userDb.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok:false,
                msg:'Forbiden'
            })
        }

        next();

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'INTERNAL SERVER ERROR'
        })

    }



}


const validateAdminRoleOrMyUser = async ( req,res, next )=>{

    const uid = req.uid;
    const id = req.params.id;
    try {

        const userDb = await Usuario.findById(uid);

        if(!userDb){
            return res.status(404).json({
                ok:false,
                msg:'User not found'
            })
        }

        if(userDb.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok:false,
                msg:'Forbiden'
            })
        }

       

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'INTERNAL SERVER ERROR'
        })

    }


}


module.exports = {
    validateToken,
    validateAdminRole,
    validateAdminRoleOrMyUser
}