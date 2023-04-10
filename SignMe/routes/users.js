var express = require('express');
var router = express.Router();
var user = require('../models/users');
var jwt = require('jsonwebtoken');

router.post('/signup', async function(req, res, next) {
  let id = req.body.id
  let full_name = req.body.full_name
  let username = req.body.username
  let email = req.body.email
  let instance = req.body.instance
  let password = req.body.password
  let sign_img = req.body.sign_img

  const users = await user.create({ 
    id : id,
    full_name : full_name,
    username : username,
    email : email,
    instance : instance,
    password : password,
    sign_img : sign_img
  });

  if (users){
    res.json({
      message : "Registrasi berhasil", 
      data : {
        id : id,
        full_name : full_name,
        username : username,
        email : email,
        instance : instance,
        password : password,
        sign_img : sign_img
      },
      redirectUrl : '/users/login'
    })
  }else{
    res.json({
      message : "Registrasi gagal",
      redirectUrl : '/users/signup'
    })
  }
})

router.post('/login', async function(req, res, next){
  let email = req.body.email
  let password = req.body.password

  const users = await user.findOne({ 
    where : { 
      email : email, 
      password : password } 
  });

  if (users === null) {
    res.send('Anda tidak memiliki akun');
  } else {
    const token = jwt.sign({
      email : email, 
      password : password
    }, 
    'secretkey', {
      expiresIn : '60s'
    })

    res.json ({
      message : "Selamat Datang!",
      token : token
    })
  }
})

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// router.get('/profile', function(req, res, next){
//   res.json({
//     "success" : true,
//     data : {
//       id : id,
//       full_name : full_name,
//       username : username,
//       email : email,
//       instance : instance,
//       password : password,
//       sign_img : sign_img
//     }
//   })
// })

module.exports = router;

