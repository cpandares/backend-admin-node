const { response } = require('express');
const bcrypt = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const { generateToken } = require('../helpers/jwt');

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

module.exports = {
    login
}