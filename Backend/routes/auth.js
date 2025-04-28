import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';



const router = express.Router();
router.post('/register', async(req,res)=>{

    try{
        const {name,email, password} = req.body;

        const user = await  User.findOne({email});

        if(user){
            return res.status(401).json({success: false, message: "User Already Exists..... "})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,email,password: hashPassword
        });

        await newUser.save();

        return res.status(200).json({success: true, message: " User Created Successfully"});

    }
    catch(error){
        console.log(error.message);
        
        res.status(500).json({success: true, message: error});

    }

});



router.post('/login', async(req,res)=>{

    try{
        const {email, password} = req.body;        
        const user = await  User.findOne({email});

        if(!user){
            res.status(401).json({success:false, message : "user not Found "});
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword)
        {
            res.status(401).json({success: false, message: "Password Does not match"})
        }

        const token = jwt.sign({id: user._id}, "secretsecret", {expiresIn: "5h"} );

       res.status(200).json({success: true,token, user: {name: user.name}, message: "user Login successfull"});

    }
    catch(error){
        console.log(error.message);
        
        res.status(500).json({success: true, message: error});

    }

});

export default router;

