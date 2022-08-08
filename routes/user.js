const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { emailExiste, existeUsuarioPorId, confirmPassword } = require('../helpers/db-validator');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controller/user');


const router = Router();

router.get('/', usuariosGet);

router.post('/',  [
       check('nombre','El nombre es obligatorio').not().isEmpty(),
       check('correo','El correo no es válido').isEmail(),
       check('password','El password debe ser de 6 letras').isLength({ min: 6}),
       check('correo').custom( emailExiste ), 
       check('password', 'password incorrecta').custom(confirmPassword),
       validarCampos
],usuariosPost);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(), 
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosPut);

router.delete('/',usuariosDelete);




module.exports = router;