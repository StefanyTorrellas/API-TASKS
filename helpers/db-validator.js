const Tarea = require('../models/tarea');
const Usuario = require('../models/user');


const emailExiste = async( correo = '') => {
    //Verificar si el correo existe

    const existeEmail = await Usuario.findOne({ correo:correo });
    if( existeEmail){
        throw new Error (`El correo:  ${correo}, ya está registrado`);
    }
}
const existeUsuarioPorId = async( id ) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario){
        throw new Error (`El id no existe:  ${id}`);
    }
}
const confirmPassword = async (value,{req})=> {

        if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
        } 
        return value;
}
const existeTareaPorId = async( id ) => {
    //Verificar si la tarea existe

    const existeTarea = await Tarea.findById(id);
    if( !existeTarea){
        throw new Error (`La tarea no existe:  ${id}`);
    }
        
  
}



module.exports = {
    emailExiste,
    existeUsuarioPorId,
    confirmPassword,
    existeTareaPorId
}