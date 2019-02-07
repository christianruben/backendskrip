const jwt = require('jsonwebtoken');
const config = require('./config');
const tokenbase = require('../model/token');

async function createToken(data, pass){
    let accessToken = jwt.sign(data, config.secret, {
        expiresIn: 60*60
    });
    let refreshToken = jwt.sign(data, config.secret_refresh+pass, {
        expiresIn: 60*60*24*30
    });

    return Promise.all([accessToken, refreshToken]);
}

async function refreshToken(token, refreshToken){
    let userId = -1;
    try{
        const {user: {id}} = jwt.decode(refreshToken);
        userId = id;
    }catch(err){
        return {};
    }

    if(!userId){
        return {};
    }

    
}

function verifyToken(req, res, next){
    let token = req.headers['x-access-token'];
    if(!token) return res.status(403).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err.name != "TokenExpiredError") {
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }else if(err.name == "TokenExpiredError"){
            
        }
        req.userType = decoded.type;
        req.userId = decoded.id;
        req.userLevel = decoded.level;
        next();
    });
}

module.exports = verifyToken;