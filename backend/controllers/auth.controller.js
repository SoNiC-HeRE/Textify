// Controller for authentication routes

import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export const signup = async (req,res) => {
    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password and Confirm Password do not match"});
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error: "User already exists with this username"});
        }

        //Hash Password generator
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}` //api-endpoint for male profile pic
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}` //api-endpoint for female profile pic

        //new user object
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'male' ? maleProfilePic : femaleProfilePic 
        })

        
        if(newUser){
            //Generate JWT token
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePicture: newUser.profilePicture
        })} else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (err) {
        console.log(`Error in signup: ${err}`);
        res.status(500).json({error: "Internal server error"});
    }

    console.log("Login User");
}

export const login = async (req,res) => {
    try {
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordValid = await bcryptjs.compare(password,user?.password || "");

        if(!user || !isPasswordValid){
            return res.status(400).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePicture: user.profilePicture
        });
    } catch (err) {
        console.log(`Error in login: ${err}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (err) {
        console.log(`Error in logout: ${err}`);
        res.status(500).json({error: "Internal server error"});
    }
}