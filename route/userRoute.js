const express = require("express");

const userRouter = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const UserModel = require("../model/userModel");

// register

userRouter.post("/register", async (req, res) =>{

    const {name, email, password,isAdmin} = req.body;
    try {
        const user = await UserModel.findOne({email:email});
    
        if(user){
            res.status(401).json({msg: "Already have an acc please login!!"});
        }
        else{
            bcrypt.hash(password, 5, async (err, hash) =>{
                const nuser = new UserModel({name, email, password:hash, isAdmin});

                await nuser.save();

                res.status(201).json({msg:"new user has been register succesfully"})

            })
        }
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
})


// login

userRouter.post("/login", async (req,res) =>{

    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email:email})
        if(user){
           bcrypt.compare(password, user.password, (err, result) =>{

            if(result){
                const token = jwt.sign({isADMIN:user.isAdmin},'nil',{expiresIn:'7h'})

                res.status(201).json({"msg": "login sucessfully", "token": token})
            }

            else{
                res.status(400).json({msg:"password Mismatched !!"});
            }
           })

        }
        else{
            res.status(400).json({msg:"account not fount create account"});
        }
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
})

module.exports = userRouter;