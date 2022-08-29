const { response } = require("express");
const Tarea = require('../models/tarea');
const { now } = require('mongoose');
const { body } = require("express-validator");



const crearTarea = async(req, res = response) => {
         

    const {nombreTarea,descripcion, usuarioId} = req.body

    const fechaCreacion = new Date(now()).toISOString()

    const tareaDB = new Tarea({
        nombreTarea,
        descripcion,
        usuarioId,
        fechaCreacion,
       
    });
        
    const data = await Tarea.findOne({ nombreTarea, usuarioId});
    
    if ( data ) {
        return res.status(400).json({
            msg: `Esta Tarea: ${ data.nombreTarea }, ya existe y le pertenece al usuario: ${ data.usuarioId }`

        });
        
    }

    // Guardar DB
    await tareaDB.save();
    res.status(201).json(tareaDB);
    
} 
const obtenerTareas = async(req, res = response ) => {
    const {usuarioId}= req.params;
    const query = { usuarioId}  
    const tareas = await Tarea.find( query )
          
    res.json({
        tareas
                             //y los imprimimos en la respuesta
    });
}
const editarTareas = async(req, res = response ) => {
    const { id } = req.params;  
    const data = req.body;

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