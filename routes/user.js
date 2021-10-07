const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const {check, body} = require('express-validator');

//Configuracion de multer para almacenamiento de imagenes de perfil
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const filePath = path.join(__dirname, '../public/img/users')
        callback(null, filePath);
    },
    filename: (req, file, callback) => {
        //Utilizamos el nombre obtenido en el formulario para agregarlo al nombre del archivo de imagen
        let userName = req.body.name;
        let imgName = `img-${userName.toLowerCase().replace(/ /g, '-')}-${Date.now().toString().slice(8)}${path.extname(file.originalname)}`;
        callback(null, imgName)
    }
})

const uploadFile = multer({storage: multerDiskStorage})

//Campos a validar en el formulario de registro
const validateRegister = [
    check('name')
        .notEmpty().withMessage('Debes colocar un nombre válido').isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('username')
        .notEmpty().withMessage('Debes colocar un nombre de usuario válido').isLength({min: 5}).withMessage('El username debe tener al menos 5 caracteres'),
    check('birthday')
        .isDate().withMessage('Debes colocar una fecha válida'),
    check('address')
        .notEmpty().withMessage('Debes colocar una dirección'),
    check('type')
        .notEmpty().withMessage('Debes seleccionar tu tipo de usuario'),
    check('categoria')
        .notEmpty().withMessage('Escoge al menos una categoría'),    
    check('password')
        .notEmpty().withMessage('Escribe tu contraseña').isStrongPassword({minSymbols: 0, minLength: 8}).withMessage('Escribe un formato de contraseña válido')    
];
//Validar que la contraseña y la confirmacion de la contraseña coincidan
 const validatePassword = [ 
     body('passConfirm').custom(( value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas introducidas no coinciden');
    }
    return true;
  })]

router.get('/login', userController.login)

router.get('/register',userController.register)
router.post('/', uploadFile.single('profilePic'), validateRegister, validatePassword, userController.storeUser)

module.exports = router;