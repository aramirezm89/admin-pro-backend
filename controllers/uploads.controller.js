const path = require("path"); // incluido en node
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); //paquete que genera id automaticas
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res) => {
  const tipo = req.params.tipo; //colecciion a la que corresponde el archivo (medico,usuario,hospital,etc)
  const id = req.params.id; //id del documento al que se realizara la actualizacion y subida de archivo

  //validar tipos
  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      message: "Tipo no es medicos, usuario, u hospital",
    });
  }

  //validar si se subio un archivo

  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: "No hay archivos que subir" });
  }

  //procesar la imagen...

  const file = req.files.img;

  const extension = file.name.split(".")[1];

  //validar extension

  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      ok: false,
      message: "La estension del archivo debe ser png, jpg, jpeg, o gif",
    });
  }

  //generar el nombre del archivo

  const nombreArchivo = `${uuidv4()}.${extension}`;

  //Path para guardar imagen

  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // mover el archivo)
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: "Error al mover la imagen",
      });
    }

    //actualizar base de datos

    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      message: "Archivo subido",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res) => {
  const imagen = req.params.foto;
  const tipo = req.params.tipo;

  /*path en donde se encuentra la imagen que deseo retornar, se utiliza path.join (se debe impotar la funcionalidad path
  la cual viene incluido en node)

 */

  let pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

  //imagen por defecto
  //con fs (fileSystem puedo revisar si existe la path de la imagen)
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
    res.sendFile(pathImg);
  }
};
module.exports = {
  fileUpload,
  retornaImagen,
};
