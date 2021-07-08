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


const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;
   
    try {

        const { name, email, picture } = await googleVerify( googleToken );

     
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generateToken( usuario.id );
        
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }




}

const renewToken = async (req, res =  response)=>{

    const uid = req.uid;

    //Generar JWT
    const token = await generateToken( uid );

   
    //Fin User by uid
    usuarioDb = await Usuario.findById( uid );

    res.json({
        ok:true,
        token,
        usuario: usuarioDb
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}