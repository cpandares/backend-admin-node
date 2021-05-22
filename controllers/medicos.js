

 const { response } = require('express');
 const Medico = require('../models/medico');

 const getMedicos = async(req, res=response)=>{

    const medicos = await Medico.find().populate('usuario','nombre img').populate('hospital','nombre img');
 
     res.json({
         ok:true,
        medicos
     });
 
 
 }
 
 const createMedico = async (req, res=response)=>{

    const uid = req.uid;    
    //const hospitalId = req.body.hospital

    const medico = new Medico( {
        usuario:uid,        
        ...req.body
    } );

    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            msg:medicoDB
        });
    
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Unexpected error, please contact administrator'
        })
        
    }
 
  
 }
 
 const updateMedico = (req, res=response)=>{
 
     res.json({
         ok:true,
         msg:'updateHospital'
     });
 
 
 }
 
 const deleteMedico = (req, res=response)=>{
 
     res.json({
         ok:true,
         msg:'deleteHospital'
     });
 
 
 }
 
 module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
 }