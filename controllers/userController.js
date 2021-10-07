const { Console } = require('console');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersPath = path.join(__dirname, '../data/usersDataBase.json');


const userController = {
    login: (req,res) => {
        res.render('login')
    },
    register: (req,res) => {
        res.render('register')
    },
    storeUser: (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            //Acciones a realizar si no hay errores en el registro
            let users, id, userBody;
            //Leer el archivo de usuarios
            let usersList = fs.readFileSync(usersPath, 'utf-8');
            if(usersList === ""){
                //Si el archivo esta vacio (sin usuarios), inicializar el array y definir el primer id
                users = [];
                id = 1;
            } else {
                //Si el archivo ya tiene registros, hacer el parse y definir el siguiente id para colocar en el nuevo registro
                 users = JSON.parse(usersList)
                 id = users[users.length - 1].id + 1;
             }
             if(!req.file){
                 //Definir lógica por si el usuario no agrega imagen, colocandole una imagen por default, el cuerpo del formulario se desestructura en una nueva variable
                userBody = {
                    ...req.body,
                    profilePic: 'default-usersPath.png'
                } 
            }else {
                //En caso de que si tenga imagen, se colocará el nombre de forma normal
                userBody = { ...req.body,
                profilePic: req.file.filename}
            }
            //Se encripta la contraseña una vez que se verificó que tiene un formato válido
            const password = bcrypt.hashSync(req.body.password, 10);
            
            //Se borran los campos de contraseña y confirmar contraseña, ya que no se van a requerir almacenar
            delete userBody.passConfirm;
            delete userBody.password;

            //Se crea el nuevo objeto con la informacion requerida
             const newUser = {
                 id: id,
                 ...userBody,
                 password
             }
             users.push(newUser)

             //Se guarda la información en el archivo de usuarios
             fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '))
            res.redirect('/')
        } else{
            //En caso de que haya errores en el registro, enviar los errores a la vista junto con los datos ingresados para agilizar la corrección
            res.render('register', {errors: errors.array(), old: req.body})
        }       
    }
}

module.exports = userController;