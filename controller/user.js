const { response, request} = require('express');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const Usuario = require('../models/user'); //La U mayusculas de Usuarios es para permitir crear isntacias de mi modelo es un estandar
const { now } = require('mongoose');


const usuariosGet = async(req = request, res= response ) => {
    const { q, nombre, apikey, page= 1, limit }= req.query;
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey,
        page,
        limit
       
    });
}

const usuariosPost = async(req, res = response) => {
  
    const {nombre,correo, password} = req.body

    const token = uuidv4()

    const date = new Date(now()).toISOString()

    const usuario = new Usuario( {nombre, correo, password, token, fechaToken: date}); //Creación de la instancia 
    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar en la base de daatos 
    await usuario.save();
    res.json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params ;
    const { _id, password, ...resto }= req.body;

    if( password){
    //Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario);
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    })
}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}