const mongoose = require('mongoose');


const dbConnection = async() =>{

    try {
        
      await  mongoose.connect(process.env.DB_CNN, 
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex:true
                    }
                );

            console.log('Se conecto la bd')

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de Datos');
    }
    
}

module.exports = {
    dbConnection
}