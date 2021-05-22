const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updatephoto } = require("../helpers/updatephoto");

const filUpload = (req, res = response)=>{

    const type = req.params.type;
    const id = req.params.id;

    const  validType =  ['usuarios','hospitales','medicos'];

    //Validar type
    if(!validType.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:"type not found"
        });
    }

    //validte file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No file selected'
        });
    }

    //process file

    const file = req.files.imagen;

    const nameTemp = file.name.split('.');
    const fileExtension = nameTemp[ nameTemp.length - 1 ];

    //Validate Extension
    const extentensionValid = ['jpg','jpeg','png','gif'];

    if(!extentensionValid.includes( fileExtension )){
        return res.status.json({
            ok:false,
            msg:'Invalid Extension File'
        });
    }

    //Generate Name file

    const name_file = `${ uuidv4() }.${ fileExtension }`;

    //Path Guardar Archivos
    const path = `./uploads/${ type }/${ name_file }`;

    //Mover Archivo

    file.mv(path, (err)=>{
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'File Not Upload'
            });
        }

        //Update DB
        updatephoto(type, id, name_file);
         
        res.json({
            ok:true,
            msg: 'File Uploaded',
            name_file
        })
        
      });



}

const getImage = ( req, res=response )=>{

    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join( __dirname,`../uploads/${ type }/${ img }` );

    if( fs.existsSync( pathImg )){
        res.sendFile(pathImg);

    }else{
        const pathImg = path.join( __dirname,`../uploads/no-image.jpg` );
        res.sendFile(pathImg);
    }

}

module.exports = {
    filUpload,
    getImage
}