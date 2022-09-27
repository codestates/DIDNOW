const jwt = require('jsonwebtoken');
const createError = require('./Error');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.AccessToken;
    if(!token){
        return next(createError(313, "Not Authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
        if(err) return next(createError(403, "Invalid Token!"));

        req.user = data;
        next();
    })
}

module.exports = verifyToken;