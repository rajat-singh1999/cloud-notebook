const express = require('express')
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Rsingh1734";

// create user using post. No login required...(/api/auth/createuser)
router.post('/createuser',[
    body('name', 'Enter a valid name!').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:5})
    ] , async (req, res)=>{
    // if there are errors return bad requests and then the errors
    const errors = validationResult(req);
    let success=true;

    if(!errors.isEmpty()){
        success=false;
        return res.status(400).json({success:success, errors: errors.array()});
    }
    // check whether the user with same email exists already
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            success=false;
            return res.status(400).json({success:false, error: "Sorry, a user with this email already exists."})
        }
        // generating salt and using it hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {user:{id: user.id}}
        const authToken = jwt.sign(data, JWT_SECRET);
        
        // sending user a jwt token is a good practice. It is done to further secure the data between client and server.
        success=true;
        res.json({success, authToken})
    }
    // the block below catches errors that where not handled. Prevents the app from crashing in terminal. Just sends a message.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Email already taken', message:err.message})})

})

// authenticate a user: "api/auth/login". No login required...
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req,res)=>{
    // If there are errors return errors else move forward
    const errors = validationResult(req);
    let success=true;
    if(!errors.isEmpty()){
        success=false;
        return res.status(400).json({success,errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email}); //in es6, this satement can be: User.findOne({email});

        if(!user){
            success=false;
            return res.status(400).json({success,error: "Credentials are wrong!"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error: "Credentials are wrong!"})
        }

        const payload = {
                user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        success=true;
        res.json({success,authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Get loged oin user details: POST: "api/auth/getuser". login required
// I could have written the fetchuser function here, but I made a different js middleware for it. This way, the below operation does not look clogged with a function wholly written as function argument. 
router.post("/getuser", fetchuser, async (req, res)=>{
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password") // fields selected except the password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})




module.exports = router