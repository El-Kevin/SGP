const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const controller = {
    newUser: async function(req, res) {
        const {name, password}= req.body;
        
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
          name: name,
          password: hashedPassword
        })
        
        return res.status(200).send({
          username: 'Usuario creado'
          
        });
    },

    loginUser: async function(req, res) {
      //Validar si el usuario existe en la base de datos
      const {name, password} = req.body;
      console.log(name)
      const user= await User.findOne({where: {name: name}});
      if(!user){ 
        return res.status(400).send({msg: 'No existe ese usuario en la base de datos'})
      }
      
      //Validar las passwords
      const passwordValid = await bcrypt.compare(password, user.password);
      console.log(passwordValid);
      if(!passwordValid){ 
        return res.status(400).send(
          {msg: 'password incorrecto'}
          )
      }
      //Generar el token
        const token = jwt.sign({username: name}, "123");
        console.log(token);
        return res.status(200).send({token: token})

     }
}
module.exports = controller;