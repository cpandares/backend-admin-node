

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
 
 const updateMedico = async(req, res=response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:false,
                msg:'No results'
            });
        }

        const medicoChanges = {
            ...req.body,
            usuario:uid
        }

        const medicoupdated = await Medico.findByIdAndUpdate(id,medicoChanges, { new:true });

        res.json({
            ok:true,
            medico : medicoupdated
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Something wrong please contact administrator'
        })
        
    }

 
   
 
 }
 
 const deleteMedico = async(req, res=response)=>{
 
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:false,
                msg:'No results'
            });
        }

       

        const medicoDeleted = await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
           msg:'Medico Deleted'
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Something wrong please contact administrator'
        })
        
    }

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