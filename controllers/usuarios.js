const Usuario = require('../models/usuario');
const { generateToken } = require('../helpers/jwt');

const bcrypt = require('bcryptjs');
const { response } = require('express');

const getUsuarios = async(req,res)=>{

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios
    })



}

const createUser = async (req,res)=>{

   const { email,password, nombre} = req.body;

  
  

   try {    

        //Validando que no exista el EMAIL
        const emailExist = await Usuario.findOne({email});

        if(emailExist){
            return res.status(400).json({
                ok:false,
                msg:'Email already exist'
            })
        }

        const usuario = new Usuario( req.body );

        //Enriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar Usuario
        const user =  await usuario.save();

        const token = await generateToken(user.id);
        res.json({
            ok:true,
        user,
        token
        });
       
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Ocurrio un error inesperado, VER LOGS..'
        })

   }

  


}

const updateUser =  async( req, res = response )=>{

    //encontrar id user

    const uid = req.params.id;


    try {

        //Buscar el usuario en la base de datos
        const usuarioDb = await Usuario.findById( uid );

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'User no exists'
            });
        }


        //Actualizaciones

        const campos = req.body;

        if(usuarioDb.email === req.body.email){
            delete campos.email;
        }else{
            const emailExist = await Usuario.findOne({ email:req.body.email });

            if(emailExist){
                return res.status(400).json({
                    ok:false,
                    msg:'Email already exists'
                });
            }

        }

        delete campos.password;
        delete campos.google;

        const userUpdate = await Usuario.findByIdAndUpdate(uid, campos,{ new:true });

         res.json({
            ok : true,
            ususario: userUpdate
        })


        
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok:false,
            msg: 'Ocurrio un error inesperado'
        })
    }


}

const deleteUser = async (req, res = response)=>{

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById( uid );

        if(usuarioDb){
    
          await Usuario.findByIdAndDelete(uid)
           
        }else{
            return res.status(400).json({
                ok:false,
                msg:'User not found'
            });
        }
    
    
        res.json({
            ok:true,
            msg:'User Deleted'
        })

        
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
           msg:'User not found'
        })
    }

}

module.exports = {
    getUsuarios,
    createUser,
    updateUser,
    deleteUser
}