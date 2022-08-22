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

const actualizarMedico = (req, res) => {
  const uid = req.params.id;

  res.json({
    ok: true,
    message: "PutMedico",
    uid,
  });
};

const borrarMedico = (req, res) => {
  const uid = req.params.id;
  res.json({
    ok: true,
    message: "DeleteMedico",
    uid,
  });
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}