require('dotenv').config();

const express = require('express'); 
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//Configurar el CORS
app.use( cors() );

//Conexion base datos
dbConnection();

app.get('/',(req, res)=>{

    res.json({
        ok:true,
        msf:'Hola mundo'
    })

})


app.listen(process.env.PORT, () =>{
    console.log('Conexion en Node', process.env.PORT);
})



//KIak7bHke64nNCV4
//mean_user