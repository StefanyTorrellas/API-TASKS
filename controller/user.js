const { response, request} = require('express');


const usuariosGet = (req = request, res= response ) => {
    const {q, nombre, apikey, page = 10, limit } = req.query;

    res.json({
        msg: 'get API desde el controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, correo, password, id} = req.body
    res.json({
        msg: 'post API -usuariosPost',
        nombre,
        correo,
        password,
        id
    })
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params ;

    res.json({
        msg: 'put API - usuariosPut',
        id
    })
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