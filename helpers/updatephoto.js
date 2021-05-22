const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImage = ( path )=>{

    if(fs.existsSync( path )){
        fs.unlinkSync(path);
    }


}

const updatephoto = async ( tipo, id, name_file )=>{

    let pathOld = '';

    switch (tipo) {
        case 'medicos':

            const medico = await Medico.findById( id );
            if(!medico){
                console.log('No se encontro medico')
                return false;
            }

             pathOld = `./uploads/medicos/${ medico.img }`;

            deleteImage(pathOld);

          

            medico.img = name_file;

            await medico.save();

            return true;
            
        break;

        case 'usuarios':

            const usuario = await Usuario.findById( id );
            if(!usuario){
                console.log('No se encontro usuario')
                return false;
            }

             pathOld = `./uploads/usuarios/${ usuario.img }`;

            deleteImage(pathOld);          

            usuario.img = name_file;

            await usuario.save();

            return true;

        
            
        break;

        case 'hospitales':

            const hospital = await Hospital.findById( id );
            if(!hospital){
                console.log('No se encontro hospitales')
                return false;
            }

             pathOld = `./uploads/usuarios/${ hospital.img }`;

            deleteImage(pathOld);          

            hospital.img = name_file;

            await hospital.save();

            return true;
       
            
        break;
    
        default:
            break;
    }

}


module.exports = {
    updatephoto
}