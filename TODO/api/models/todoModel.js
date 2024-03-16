import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    task: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("TODO", todoSchema);