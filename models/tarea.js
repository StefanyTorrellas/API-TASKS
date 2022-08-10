const { Schema, model}= require('mongoose');


const TareaSchema = Schema({

    nombreTarea:{
        type: String,
        required:[ true, 'El nombre es Obligatorio'],
        unique: true
    },

    descripcion:
    { type: String },

    estado:{
        type: Boolean,
        default: false,
        required: true
    },
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
    }
    
});

TareaSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}

module.exports = model('Tarea', TareaSchema);

