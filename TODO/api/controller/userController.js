import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { decryptPass, encryptPass } from "../middleware/bcrypt.js";
import User from "../models/userModel.js";
import { generateToken } from "../middleware/jwt.js";

// Create New User
export const createUser = catchAsyncError(async (req, res) => {
    try {
        const hashPassword = encryptPass(req.body.password);
        const newUser = new User({
            userName: req.body.userName,
            password: hashPassword
        });
        const user = await newUser.save();
        const { password, ...info } = user._doc;
        return res.status(201).json({ message: "User Created", user: info });


    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json("User already Exist ");
            // return res.status(409).json(`Duplicate ${Object.keys(error.keyValue)}`);
        }
        else {
            return res.status(500).json(error.message);
        }
    }

});

// login New User
export const loginUser = catchAsyncError(async (req, res) => {
    try {

        const user = await User.findOne({ userName: req.body.userName });
        if (!user) return res.status(404).json("Username or Password is Incorrect");
        const valid = decryptPass(req.body.password, user.password);
        if (!valid) return res.status(404).json("Username or Password is Incorrect");

        const accessToken = generateToken(user._id, user.isAdmin);

        const { password, ...info } = user._doc;

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
        }).status(201).json({ ...info, accessToken });

    } catch (error) {
        return res.status(500).json(error.message);
    }

});


export const getAllUser = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const users = await User.find().sort({ id: -1 });

            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json(error.message);

        }
    } else {
        return res.status(401).json("You are not allow");

    }
});