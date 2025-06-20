const bcrypt = require('bcryptjs')
const User = require('../models/User')
const createToken = require('../utils/token')

//sign-up requirement : name, email and password
//login requirement : email and password

exports.signup = async (req, res, next)=>{
    try{
        const {name, email, password} = req.body;
        let userEmail = User.findOne({email});
        if(!userEmail){
            res.status(400).json({error: 'User already exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 4)
        const user = new User({name, email, password:hashedPassword})
        await user.save();
        const token = createToken(user._id);
        res.status(201).json({token})
    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            res.status(201).json({error: "Invalid crediantials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({error: "Invalid crediantials"})
        }
        const token = createToken(user._id);
        console.log("token created sucessfully")
        res.status(201).json({token});
    }catch(err){
        next(err)
    }
}


//getting user information (Profile): 
//through token user-id is taken and from that user information is taken in auth middleware and updated the req.user body with the information
//which is user profile

exports.getprofile = async (req, res, next) =>{
    try{
        res.json(req.user)
    }catch(err){
        next(err)
    }
}
