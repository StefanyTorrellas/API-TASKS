const { response } = require('express');
const bcryptjs     = require('bcryptjs');

const Usuario      = require('../models/user')

const login = async(req, res= response) => {
    
    const { correo, password} =req.body;

    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario){
            return res.status(400).json({
                msg:'Usuario y Contraseña no son correctos - CORREO'
            })
        }

        //Verificar si mi usuario esta activo en mi base de datps 
      
        if( usuario.estado){
        return res.status(400).json({
                msg:'Usuario y Contraseña no son correctos - estado:false'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
            
        }

        

        //En este punto deberia verificar el JWT pero no lo voy a requerir en esta practica

        return res.status(400).json ({
            msg: 'login ok',
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