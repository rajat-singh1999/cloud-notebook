const express = require('express')
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require('express-validator');

router.post('/',[
    body('name').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:5})
    ] , (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:'Email already taken', message:err.message})})

})

module.exports = router