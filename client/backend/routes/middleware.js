const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = process.env.JWT_SECRET
    req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("Token: ", token);

    if(!token) {
        return res.status(403).send("A token is required")
    }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            
        } catch(err) {
            return res.status(401).send("Invalid token")
        }
        return next();

    
}



module.exports = verifyToken;