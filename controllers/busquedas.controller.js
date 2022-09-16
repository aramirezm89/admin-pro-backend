const Hospital = require("../models/hospital");
const Medico = require("../models/medicos");
const Usuario = require("../models/usuario");

const getTodo = async (req, res) => {
  const query = req.params.query;

  const [usuarios, medicos, hospitales] = await Promise.all([
    /*regex se usa para filtrar el nombre segun el query que llegue y el parametro options:'i' significa que no
    se va a distinguir entre mayusculas o minusculas "Case insensitivity "
  */
    Usuario.find({ nombre: { $regex: query, $options: "i" } }),
    Medico.find({ nombre: { $regex: query, $options: "i" } }),
    Hospital.find({ nombre: { $regex: query, $options: "i" } }),
  ]);
  res.status(200).json({
    ok: true,
    paramteroBusqueda: query,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const query = req.params.query;

  let data = [];
  let totalRegistros = 0
  let registros = [];

  switch (tabla) {
    /*regex se usa para filtrar el nombre segun el query que llegue y el parametro options:'i' significa que no
    se va a distinguir entre mayusculas o minusculas "Case insensitivity "
  */
    case "medicos":
      data = await Medico.find({
        nombre: { $regex: query, $options: "i" },
      }).populate("hospital", "nombre img");
       registros = data.length;
      totalRegistros = await Medico.count();
      break;
    case "hospitales":
      data = await Hospital.find({
        nombre: { $regex: query, $options: "i" },
      }).populate("usuario", "nombre img");
       registros = data.length;
      totalRegistros = await Hospital.count();
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: { $regex: query, $options: "i" } });
       registros = data.length;
      totalRegistros = await Usuario.count();
      break;
    default:
      return res.status(400).json({
        ok: false,
        messagge: "La tabla debe ser usuarios,medicos,hospitales",
      });
  }

   res.json({
    ok:true,
    resultados : data,
    totalRegistros,
    registros,
    coleccion : tabla,
   })
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
