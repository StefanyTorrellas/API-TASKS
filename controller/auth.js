const { response }   = require('express');
const bcryptjs       = require('bcryptjs');
const { now }        = require('mongoose');
const { v4: uuidv4, validate} = require('uuid');

const Usuario        = require('../models/user');

const login = async(req, res= response) => {
    
    const { correo, password,} =req.body;

    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        
        if( !usuario){
            return res.status(400).json({
                msg:'Usuario y Contraseña no son correctos - CORREO'
            })
        }

        //Verificar si mi usuario esta activo en mi base de datps 
      
        if( !usuario){
        return res.status(400).json({
                msg:'Usuario y Contraseña no son correctos'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
            
        }
        const token = uuidv4()
        
        const fechaToken = new Date(now()).toISOString()

        const filter = { _id: usuario._id.toString() }; //Mirar la documentacion
        const update = { token: token, fechaToken };

        const usuarioRes = await Usuario.findOneAndUpdate(filter, update);
        usuarioRes.token= token;

        return res.status(200).json ({
            msg: 'Usuario logueado correctamente',
            usuario: usuarioRes,
            token,
                        
        })

        

    } catch (error) {
        console.log("🚀 ~ error", error);
        return res.status(500).json({
            msg:'Hable con la persona encargada del Backend'
        })
    }

    
}


module.exports ={
    login
}