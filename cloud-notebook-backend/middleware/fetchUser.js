const jwt = require("jsonwebtoken");

const JWT_SECRET = "Rsingh1734";
const fetchUser = (req, res, next)=>{
    //get the user from the jwt token and add id to request obeject
    const token = req.header('auth-token');
    if(!token){ // if not token is passed(in-valid post request)
        res.status(401).send({error: "Please authenticate using a valid token."})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); // this will automatically throw an error if the auth token is not valid
        req.user = data.user;
        next();        
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token."})
    }
}

module.exports = fetchUser;