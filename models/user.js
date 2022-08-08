const { Schema, model}= require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:[ true, 'El nombre es Obligatorio']
    },
    correo:{
        type: String,
        required:[ true, 'El email es Obligatorio']
    },
    password:{
        type: String,
        required:[ true, 'El password es Obligatorio']
    },
    token:{
        type: String,
        required:[ true, 'El token es Obligatorio']
    },
    fechaToken: {
        type: Date,
        required:[ true, ' La fechaToken es Obligatoria']
    }
    
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid= _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);

