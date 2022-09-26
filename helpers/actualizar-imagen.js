const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')

const fs = require('fs'); //leer carpetas y archivos

const borrarImagen = (path) =>{
  //con fs valido si existe un archivo con el path viejo si es asi lo elimino
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {
   let pathViejo = '';
   
    switch (tipo) {
      case "medicos":

        const medico = await Medico.findById(id); //busca el documento en la colecciond de medicos segun la id

        //validacion si el medico existe
        if(!medico){
            console.log('medico no existe')
            return false;
        }

        //path que se utilizara para borrar la imagen si es que ya existe en la carpeta uploads
         pathViejo = `./uploads/medicos/${medico.img}`;
        
        borrarImagen(pathViejo)
       
        medico.img = nombreArchivo;

        await medico.save();
        return true
        break;

      case "hospitales":
        
        const hospital = await Hospital.findById(id); //busca el documento en la colecciond de medicos segun la id

        //validacion si el hospital existe
        if(!hospital){
            console.log('hospital no existe')
            return false;
        }

        //path que se utilizara para borrar la imagen si es que ya existe en la carpeta uploads
         pathViejo = `./uploads/hospitales/${hospital.img}`;
        
        borrarImagen(pathViejo)
       
        hospital.img = nombreArchivo;

        await hospital.save();
        break;

      case "usuarios":

      const usuario = await Usuario.findById(id); //busca el documento en la colecciond de medicos segun la id

      //validacion si el usuario existe
      if (!usuario) {
        console.log("Usuario no existe");
        return false;
      }

      //path que se utilizara para borrar la imagen si es que ya existe en la carpeta uploads
       pathViejo = `./uploads/usuarios/${usuario.img}`;

      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;

      await usuario.save();
        break;

      default:
        break;
    }
};

module.exports = {
    actualizarImagen
}