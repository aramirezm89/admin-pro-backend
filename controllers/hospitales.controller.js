const Hospital = require("../models/hospital");

const getHospitales = async (req, res) => {
 
 try {
  
  const hospitalesDB = await Hospital.find()
    .sort({
      nombre: 1,
    })
    .populate("usuario", "nombre email img");

  res.json({
    ok: true,
    message: "Listado de hospitales",
    hospitalesDB,
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({
    ok:false,
    message:'Error inesperado'
  })
 }
};

const crearHospital = async (req, res) => {
 
  const uid = req.uid;//uid proviene del middleware validarJWT
  const {nombre} =  req.body
  const hospital = new Hospital({
    ...req.body,
    usuario: uid,
    nombre: nombre.toLowerCase(),
  });

  try {

    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      message: "Hospital creado con exito",
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const actualizarHospital = (req, res) => {
  const uid = req.params.id;

  res.json({
    ok: true,
    message: "PutHospitales",
    uid,
  });
};

const borrarHospital = (req, res) => {
  const uid = req.params.id;
  res.json({
    ok: true,
    message: "DeleteHospitales",
    uid,
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
