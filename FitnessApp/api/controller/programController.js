import Program from "../models/programModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Exercise from "../models/exerciseModel.js";


// create a new program


export const createProgram = catchAsyncError(async (req, res) => {
    try {

        const data = await Exercise.findById(req.body.exerciseId);
        if (!data) return res.status(404).json("No exercise found");

        const newProgram = new Program({
            name: req.body.name,
            exercise: req.body.exerciseId
        });

        const program = await newProgram.save();

        return res.status(201).json(program);

    } catch (error) {
        return res.status(500).json(error.message);

    }

});

// getAll Program

export const getAllPrograms = catchAsyncError(async (req, res) => {

    try {

        const programs = await Program.find().populate({ path: "exercise" }).sort({ _id: -1 });
        res.status(200).json(programs);

    } catch (error) {
        res.status(500).json(error.message);
    }
});


// getProgram By ID

export const getProgramById = catchAsyncError(async (req, res) => {

    try {

        const program = await Program.find({ _id: req.params.id }).populate({ path: "exercise" });
        if (program.length === 0) return res.status(404).json("No Program Found");
        res.status(200).json(program);

    } catch (error) {
        res.status(500).json(error.message);
    }
});


// updateProgram By ID

export const updateProgramById = catchAsyncError(async (req, res) => {

    try {

        const data = await Exercise.findById(req.body.exerciseId);

        if (!data) return res.status(404).json("NO Exercise found");
        const prId = await Program.findById(req.params.id);
        if (!prId) return res.status(404).json("NO Program found");

        const program = await Program.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                exercise: req.body.exerciseId,
            }
        }, { new: true });
        res.status(200).json(program);

    } catch (error) {
        res.status(500).json(error.message);
    }
});

// deleteProgram By ID

export const deleteProgramById = catchAsyncError(async (req, res) => {

    try {

        const data = await Program.findById(req.params.id);

        if (!data) return res.status(404).json("NO Program found");

        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json("Program has been Successfully Deleted");

    } catch (error) {
        res.status(500).json(error.message);
    }
});




