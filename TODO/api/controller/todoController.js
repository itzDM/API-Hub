import { catchAsyncError } from "../middleware/catchAsyncError.js";
import TODO from "../models/todoModel.js";

// get  all todo task

export const getAllTask = catchAsyncError(async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const task = await TODO.find()
        .populate({ path: "userId", select: "userName" })
        .sort({ _id: -1 });
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    return res.status(401).json("Your are not Allow");
  }
});
// get Task By ID
export const getTaskById = catchAsyncError(async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const task = await TODO.find({ userId: req.params.id })
        .populate({ path: "userId", select: "userName" })
        .sort({ _id: -1 });
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    return res.status(401).json("Your are not Allow");
  }
});

//get user task

export const getUserTask = catchAsyncError(async (req, res) => {
  const data = req.user;
  try {
    const task = await TODO.find({ userId: data.id })
      .populate({ path: "userId", select: "userName" })
      .sort({ _id: -1 });
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// create a todo task

export const createTask = catchAsyncError(async (req, res) => {
  try {
    const data = req.user;
    const newTask = new TODO({
      userId: data.id,
      task: req.body.task,
    });

    const task = await newTask.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// update task

export const updateTask = catchAsyncError(async (req, res) => {
  const data = req.user;
  if (data) {
    try {
      if (!Object.keys(req.body).length)
        return res.status(400).json("Somethings Went Wrong");
      const updateTask = await TODO.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json("task has been updated");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(500).json("Please Login");
  }
});

// Delete task
export const deleteTask = catchAsyncError(async (req, res) => {
  const data = req.user;
  if (data) {
    try {
      const verifyData = await TODO.findByIdAndDelete(req.params.id);
      if (verifyData === null) {
        return res.status(200).json("Data is not found");
      }
      return res.status(200).json("task has been Deleted");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(500).json("Please Login");
  }
});
