const { response } = require('express');
const bcrypt = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const { generateToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-signin');

const login = async( req, res = response )=>{

    const { email, password } = req.body;

    try {

        const userDb = await Usuario.findOne( {email} );

        if(!userDb){
            return res.status(404).json({
                ok:false,
                msg:'Email not found'
            });
        }

        //Valido password

       

        const validPassword = bcrypt.compareSync(password, userDb.password);

        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Password not found'
            });
        }
        
        //Generar JWT
        const token = await generateToken( userDb.id );

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Somethings wrong, please contact administrator'
        });
    }

}

const googleSignIn = async( req, res )=>{

    const token = req.body.token;

    try {

      const { name,email,picture  } = await googleVerify(token);

      //Verificar email existe
      const usuarioDb = Usuario.findOne({email});
      let usuario;

      if(!usuarioDb){

        usuario = new Usuario({
            nombre: name,
            email,
            password:'@@@',
            img:picture,
            google: true
        })
      }else{
          usuario = usuarioDb;
          usuario.google = true;
          usuario.password = '@@@@'
      }

      //Guardar en Db

      await usuario.save();

      //Generar JWT
      const token = await generateToken( usuario.id );

        res.json({
            ok:true,
            msg : 'Google Signin',
            name,email,picture
        })
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg : 'No Token'
        })
    }

  

}

const renewToken = async (req, res =  response)=>{

    const uid = req.uid;

    //Generar JWT
    const token = await generateToken( uid );

    res.json({
        ok:true,
        token
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}