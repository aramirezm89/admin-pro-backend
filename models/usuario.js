const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//esto permite que no se retorne el password ni el campo __v generado automaticamente por mongoose (solo a nivel visual )
UsuarioSchema.method('toJSON',function(){
  const {password,__v, ...object} = this.toObject();
  return object;
})

module.exports = model('Usuario',UsuarioSchema);
