const  JWT_SECRET = require('./config');
const jwt = require("jsonwebtoken");

const authMiddleware =  (req,res,next)=>{
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    console.log(JWT_SECRET);
    const token = authHeader.split(' ')[1];
    try{
        
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        if(decoded.userId){
            req.userId =  decoded.userId;
            console.log(decoded.userId);
            next();
        }
        else{
                return res.status(403).json({});
        }
    }
    catch(err){
        return res.status(403).status({});
    }
};

module.exports = {
    authMiddleware
}