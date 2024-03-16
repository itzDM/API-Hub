import mongoose from "mongoose";


const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Require"],
        unique: true
    },
    length: {
        type: Number,
        required: [true, "length is require"],
    }

}, { timestamps: true });


export default mongoose.model("Exercise", exerciseSchema);