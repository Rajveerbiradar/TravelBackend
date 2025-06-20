const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/User')

const isValidHeader = (headerAuthorization)=>{      
    if(!headerAuthorization){                                               // checking that do we even get a valid header.authorization ?
        res.status(401).json({error: "token not provided"})                 
    }
    const [tokenType, token] = headerAuthorization.split(' ');              //extracting authorizaton token-type and token 

    if(tokenType == "Bearer"){                                              //checking if the token is bearer or not
        console.log('the authorization type is mathced : token is provided')
        return token                                                        // if valid will return the token.
    }

    return null;
}

const authMiddleware = async (req, res, next)=>{
    const headerAuthorization = req.headers.authorization;
    const token = isValidHeader(headerAuthorization); 
    try{
        const decoded = jwt.verify(token, config.jwtSecret);                //checking if we even have the token and then verifying it
        
        const user = await User.findById(decoded.userID).select('-password');       //getting the user document but not the password in it
        
        if(!user){                                         //if nothing is returned, if user is not there then it will be null = false
            res.status(401).json({error: " user not found "});
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({error: "Token is not valid"})
    }
}

module.exports = authMiddleware;