const jwt = require('jsonwebtoken');
const config = require('./config');

function verifyToken(req, res, next){
    let token = req.get('Authorization');
    if(!token) return res.status(403).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }
        req.admin        = null;
        req.teacher      = null;
        req.student      = null;
        req.userId       = decoded.id;
        req.ownId        = decoded.owner;
        switch(decoded.level){
            case 1:
                req.student = true;
            break;
            case 2:
                req.teacher = true;
            break;
            case 3:
                req.admin = true;
            break;
            default:
                // nothing
            break;
        }
        next();
    });
}

module.exports = verifyToken;