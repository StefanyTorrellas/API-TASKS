const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');

const { existeUsuarioPorId, existeTareaPorId } = require('../helpers/db-validator');

const { crearTarea, obtenerTareas, editarTareas, borrarTarea }=require('../controller/tarea');

const router = Router();

//Registro de una tarea
router.post('/',  [
    check('nombreTarea','El nombre de la tarea es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion de la tarea es obligatorio').not().isEmpty(),
    check('usuarioId'  ,'usuarioId es obligatorio').custom(existeUsuarioPorId),
    validarCampos
], crearTarea);


//Consultar todas las tareas 
router.get('/:usuarioId', obtenerTareas);

// //Editar una tarea
router.put('/:id', [
    check('id').custom(existeTareaPorId ),
    check('nombreTarea','El nombre de la tarea es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion de la tarea es obligatoria').not().isEmpty(),
    check('usuarioId'  ,'usuarioId es obligatorio').custom(existeUsuarioPorId),
    validarCampos 
], editarTareas);

// //Eminar una tarea
router.delete('/:id', [ 
    check('id').custom( existeTareaPorId),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos

], borrarTarea);




// //Completar una tarea
// router.put('/', tareasPut);











module.exports = router; 