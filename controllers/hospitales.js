

const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async (req, res=response)=>{

    const hospitales = await Hospital.find()
                                    .populate( 'usuario', 'nombre img' );

        res.json({
            ok:true,
            hospitales
        });


}

const createHospital = async(req, res = response)=>{

    const uid = req.uid;    

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    })

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            msg: hospitalDB
        });
        
    } catch (error) { 
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Unexpected Error, please contact administrator'
        })
    }


   


}

const updateHospital = async(req, res=response)=>{

    const id = req.params.id;
    const uid = req.uid;

  
    try {

        const hospitalDb = await Hospital.findById(id);

        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No hospital found'
            });
        }
        
       const changesHospital = {
           ...req.body,
            usuario:uid
       }

       const hospitalUpdate = await Hospital.findByIdAndUpdate(id,changesHospital, { new:true });

        
        res.json({
            ok:true,
            hospital:hospitalUpdate
        });
        
    } catch (error) {

        console.log(error);
        res.json({
            ok:false,
            msg:'Something wrong, please contact administrator'
        })
        
    }




}

const deleteHospital = async(req, res=response)=>{

    const id = req.params.id;

    try {

        const hospitalDb = await Hospital.findById(id);

        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No hospital found'
            });
        }
        
      

       const hospitalDelete = await Hospital.findByIdAndDelete(id);


        res.json({
            ok:true,
            msg:'Hopital Deleted'
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Something wrongs '
        });
    
    }

  

}

module.exports = {
    createHospital,
    getHospitales,
    updateHospital,
    deleteHospital
}