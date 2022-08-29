const { response, request } = require("express");
const { now } = require("mongoose");
const { diffMinutes } = require("../helpers/diff-minutes");

const Tarea = require("../models/tarea");
const Usuario = require("../models/user");

const validarToken = async (req = request, res = response, next) => {
  //Verificar si el token esta activo
  const { usuarioId } = req.body;

  const token = req.header("token");

  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    return res.status(400).json({
      msg: " Es necesario el token de autenticación ",
    });
  }

  //Verificar si el token es del usuario

  if (usuario.id !== usuarioId) {
    return res.status(401).json({
      msg: "Usuario no Autorizado",
    });
  }

  //Verificar si el token no esta vencido

  const timeToken = diffMinutes(usuario.fechaToken);

  if (timeToken >= (process.env.TIME_TOKEN || 5)) {
    return res.status(400).json({
      msg: "Token vencido",
    });
  }
  next();
};

module.exports = {
  validarToken,
};
