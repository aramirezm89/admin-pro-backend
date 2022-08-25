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
      ok: false,
      message: "Error inesperado",
    });
  }
};

const crearHospital = async (req, res) => {
  const uid = req.uid; //uid proviene del middleware validarJWT
  const { nombre } = req.body;
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

const actualizarHospital = async (req, res) => {
  const idHospital = req.params.id; //la id del hospital que viene en la url de la peticion
  const uid = req.uid; //propiedad inclucida en el middleware validarJWT()
  const { nombre } = req.body; //destructuracion de propiedades que vienen en el body de la peticion

  try {
    const hospitalDB = await Hospital.findById(idHospital); //busqueda de documento hospital por id

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        message: "Hospital no encontrado",
      });
    }
   
    hospitalDB.nombre = nombre.toLowerCase();
    hospitalDB.usuario = uid;

    //realizado actualizacion del documento mediante findByIdAndUpdate()
    //la opcion new:true ,  permite visualizar de forma inmediata el cambio realizado al obtener la respuesta.
    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      idHospital,
      hospitalDB,
      { new: true }
    );

    res.json({
      ok: true,
      message: "Hospital actualizado",
      hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      message: "Error desconocido",
    });
  }
};

const borrarHospital = async (req, res) => {

  const idHospital = req.params.id

try {

    const hospitalDB = await Hospital.findById(idHospital);

    if(!hospitalDB){
      return res.status(404).send({
        ok:false,
        message:'Hospital no encontrado'
      })
    }
   await Hospital.findByIdAndDelete(idHospital);

   return res.json({
    ok:true,
    message:'Hospital eliminado'
   })
} catch (error) {
  console.log(error);
  res.status(500).json({
    ok:false,
    message:'Error inesperado'
  })
}

  res.json({
    ok: true,
    message: "DeleteHospitales",
    idHospital,
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
