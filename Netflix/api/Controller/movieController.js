import Movie from "../Models/movieModel.js";
import catchAsyncError from "../Middleware/catchAsyncError.js";


// create Movie (post)
const createMovie = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        const movie = new Movie(req.body);
        try {
            const newMovie = await movie.save();
            res.status(200).json(newMovie);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(403).json("You are Not Allow");

    }
});

// update Movie (put)
const updateMovie = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(403).json("You are Not Allow");

    }
});


// delete Movie (delete)
const deleteMovie = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie Deleted Successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(403).json("You are Not Allow");

    }
});


// get all movie (get)

const allMovie = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            
            const movie = await Movie.find().sort({ _id: -1 });
            const total = await Movie.countDocuments();
            res.status(200).json({ movie, total });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
});

// find movie (get)
const findMovie = catchAsyncError(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


// get random movie

const randomMovie = catchAsyncError(async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },

            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);

        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error.message);

    }
});


export { createMovie, updateMovie, deleteMovie, findMovie, allMovie, randomMovie };
