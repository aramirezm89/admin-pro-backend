const mongoose = require('mongoose');

const dbConnection =  async () =>{
    try {
        await mongoose.connect(process.env.BD_CONNECCTIONSTRING);
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al intentar conectarse a la DB')
    }   
}

module.exports = {
    dbConnection
}