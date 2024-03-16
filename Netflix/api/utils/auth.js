import { Router } from "express";
import catchAsyncError from "../Middleware/catchAsyncError.js";
import User from "../Models/userModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";



// Register

const registerUser = catchAsyncError(async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRETE_KEY).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message);


    }
});

// LOgin

const loginUser = catchAsyncError(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong Password Or User Name");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRETE_KEY);

        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Password Or User Name");

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRETE_KEY, { expiresIn: process.env.EXPIRE_DAY });

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });

    } catch (error) {
        res.status(404).json(error.message);

    }

});

export { registerUser, loginUser };