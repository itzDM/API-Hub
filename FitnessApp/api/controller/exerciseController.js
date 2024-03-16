import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Exercise from "../models/exerciseModel.js";



// Create exercise


export const createExercise = catchAsyncError(async (req, res) => {
    const time = req.body.length;
    if (!Number.isInteger(time)) return res.status(406).json("Only Integer value allow");

    try {
        const newExercise = new Exercise({
            name: req.body.name,
            length: time
        });

        const exercise = await newExercise.save();
        return res.status(201).json(exercise);

    } catch (error) {
        res.status(500).json(error.message);

    }

});


// delete an exercise


export const deleteById = catchAsyncError(async (req, res) => {

    try {

        const data = await Exercise.findById(req.params.id);
        if (!data) return res.status(404).json("No Exercise Found");
        await Exercise.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted ");

    } catch (error) {
        res.status(500).json(error.message);

    }
});