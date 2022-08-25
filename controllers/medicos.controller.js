const Medico = require('../models/medicos')

const getMedicos = async (req, res) => {
  
  try {
    const medicosDB = await Medico.find()
      .sort({ nombre: 1 })
      .populate("usuario", "nombre email img").populate('hospital','nombre');

    res.json({
      ok: true,
      message: "Listado de medicos",
      medicos:medicosDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      message:'Error insesperado'
    })
  }
};

const crearMedico = async (req, res) => {
  const uid = req.uid; //uid proviene del middleware implementado en routes validarJWT
  const {nombre} = req.body;
  
  const medico = new Medico({
    ...req.body,
    usuario: uid,
    nombre: nombre.toLowerCase(),
  });

  try {

    const medicoDB = await medico.save();
    res.json({
      ok: true,
      message: "Medico creado con exito",
      medico:medicoDB,
   
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const actualizarMedico = async (req, res) => {
  const idMedico = req.params.id;
  const uid = req.uid;//propiedad que su valor es seteado en el middleware de validarJWT()

  const {nombre,hospital}  = req.body;
 try {
  
   const medicoDB = await Medico.findById(idMedico);

   if(!medicoDB){
    return res.status(404).json({
      ok:false,
      message:'Medico no encontrado'
    })
   }

    const medicoActualizado = await Medico.findByIdAndUpdate(idMedico,req.body,{new:true});
   res.json({
     ok: true,
     message: "Medico Actualizado",
     medicoActualizado,
   });
 } catch (error) {
  console.log(error);
  res.status(500).json({
    ok:false,
    message:'Error inesperado'
  })
 }
 
};

const borrarMedico = async (req, res) => {

  const medicoId = req.params.id;
 
 try {
  const medicoDB = await Medico.findById(medicoId);

  if(!medicoDB){
    return res.status(404).json({
      ok:false,
      message:'Medico no encontrado'
    })
  }

  await Medico.findByIdAndDelete(medicoId);

  return res.json({
    ok:true,
    message:'Medico eliminado'
  })

  
 } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      message:'Error inesperado'
    })
 }
 
 
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}