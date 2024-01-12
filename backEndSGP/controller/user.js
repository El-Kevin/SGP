const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const controller = {
    newUser: async function(req, res) {
        const {username, password}= req.body;
        
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
          user_name: username,
          user_password: hashedPassword
        })
        
        return res.status(200).send({
          username: 'Usuario creado'
          
        });
    },

    loginUser: async function(req, res) {
      //Validar si el usuario existe en la base de datos
      const {username, password} = req.body;
      console.log(username)
      console.log(password)
      const user= await User.findOne({where: {user_name: username}});
      if(!user){ 
        return res.status(400).send({msg: 'No existe ese usuario en la base de datos'})
      }
      
      //Validar las passwords
      const passwordValid = await bcrypt.compare(password, user.user_password);
      console.log(passwordValid);
      if(!passwordValid){ 
        return res.status(400).send(
          {msg: 'password incorrecto'}
          )
      }
      //Generar el token
        const token = jwt.sign({username: username}, "123");
        console.log(token);
        return res.status(200).send(
          {
            token: token,
            id_user: user.id_user,
            username: user.user_name
          }
          )

     }
}
module.exports = controller;