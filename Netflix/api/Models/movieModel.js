import mongoose from "mongoose";

const movieSchema = mongoose.Schema({

    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    imgThumb: { type: String, required: true },
    trailer: { type: String, required: true },
    video: { type: String, required: true },
    year: { type: String },
    genre: { type: String },
    limit: { type: Number },
    isSeries: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);