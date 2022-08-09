const express = require('express');
require('dotenv').config();//esto sirve para cargar las variables de entorno del archivo .env ubicado raiz del proyecto
const {dbConnection} = require('./DB/config');
const cors = require('cors')


//creacion del servidor/aplicación express

const app = express();


//conexión base de datos

dbConnection();


///cors
app.use(cors());
//routes

app.use('/api/ejemplo',require('./routes/ejemplo.routes'))



//configuracion del puerto en el que trabajara el servidor

app.listen(process.env.PORT, () =>{
    console.log(`el servidor esta trabajando en el puerto ${process.env.PORT}`)
})