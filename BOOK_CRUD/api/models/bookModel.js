import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
},
    {
        timestamps: { createdAt: 'publishedDate' }
    }
);

export default mongoose.model("Book", bookSchema)

