const { response } = require("express");

const Tarea = require('../models/tarea')

const { now } = require('mongoose');
const { body } = require("express-validator");


const crearTarea = async(req, res = response) => {
    const {nombreTarea,descripcion, usuarioId } = req.body
    
    const fechaCreacion = new Date(now()).toISOString()

    const tareaDB = new Tarea( {
        nombreTarea,
        descripcion,
        estado: false,
        usuarioId,
        fechaCreacion,
    });
    
    const data = await Tarea.findOne({ nombreTarea});
    
    if ( data ) {
        return res.status(400).json({
            msg: `Esta Tarea ${ data.nombreTarea }, ya existe`
        });
        
    }

    // Guardar DB
    await tareaDB.save();
    res.status(201).json(tareaDB);
    
} 
const obtenerTareas = async(req, res = response ) => {

    // const { limite = 5, desde = 0 } = req.query; 
    const { usuarioId } = req.params;

    const name = 'PRUEBA';
    const [total, tarea] = await Promise.all([      
        Tarea.countDocuments(usuarioId),
        Tarea.find({ usuarioId, nombreTarea: { $regex: `.*${name}.*` }  })  
        // .skip(Number( desde ))
        // .limit(Number( limite ))
    ]);

    res.json({
        total,                          //y los imprimimos en la respuesta
        tarea
    });
}
const editarTareas = async(req, res = response ) => {
    const { id } = req.params;  
    
    const fechaCreacion = new Date(now()).toISOString()

    const data = {
        ...req.body,
        fechaCreacion,
        
    }
    
    const tareaDB = await Tarea.findByIdAndUpdate(id, data,  { new: true });
    
    res.json( tareaDB );
    
}

const borrarTarea = async(req, res = response ) => {
    //Borrado Fisicamente
    const { id } = req.params;
   
    const tarea = await Tarea.findByIdAndRemove( id );
    if (!tarea) {
        return res.status(400).json({
            msg: `Esta Tarea ${ tarea.nombreTarea },fue borrada`
        });
        
    }

    res.json(tarea);
}



module.exports = {
    crearTarea,
    obtenerTareas,
    editarTareas,
    borrarTarea


}