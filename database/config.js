const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            //ojo con estos objetos, estos se piden para configurar moongose pero me dan error

        });
            
        console.log('Bases de datos online');

    } catch (error) {
        throw new Error ('Error al iniciar la base de datos');
        
    }

} 



module.exports = {
    dbConnection,

}