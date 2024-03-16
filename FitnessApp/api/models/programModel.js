import mongoose from "mongoose";


const programSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is Require"],
        unique: true
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true
    }

}, { timestamps: true });


export default mongoose.model("Program", programSchema);