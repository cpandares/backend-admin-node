
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medicos = require('../models/medico');

const getTodo = async( req,res  )=>{

    const busqueda = req.params.busqueda;
    //Exprecion regular para flexibilizar la busqueda
    const regex = new RegExp(busqueda, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        await Usuario.find({ nombre:regex }),
        await Medicos.find({ nombre:regex }),
        await Hospital.find({ nombre:regex }),
    ]);

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentos = async( req,res  )=>{


    const table = req.params.table;
    const busqueda = req.params.busqueda;
    //Exprecion regular para flexibilizar la busqueda
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    if(table === 'usuarios'){
        data =  await Usuario.find({ nombre:regex });
                            
    }else if(table ==='hospitales'){
        data = await  Hospital.find({ nombre:regex })
                              .populate('usuario', 'nombre img');  
    }else if(table==='medicos'){
        data = await  Medicos.find({ nombre:regex })
                              .populate('usuario', 'nombre img')
                              .populate('medico','nombre img');  
    }else{
        return res.status(400).json({
            ok:false,
            msg:"table don't exists"
        });
    }   

    res.json({
        ok:true,
        results: data
    })

}


module.exports = {
    getTodo,
    getDocumentos
}