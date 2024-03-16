import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter Your Name"],
        unique: true

    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be greater than 6"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

export default mongoose.model("User", userSchema);