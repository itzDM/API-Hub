import User from "../Models/userModel.js";
import CryptoJS from "crypto-js";
import catchAsyncError from "../Middleware/catchAsyncError.js";

// Update

const updateUser = catchAsyncError(async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRETE_KEY).toString();

        }
        try {

            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json(updateUser);

        } catch (error) {
            res.status(500).json(error.message);
        }

    }
});


// Delete

const deleteUser = catchAsyncError(async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted Successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

});

// Get one User
const findUser = catchAsyncError(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json("No User Found");
    }

});

// Get all User
const findAllUser = catchAsyncError(async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const user = query ? await User.find().sort({ _id: -1 }).limit(2) : await User.find().sort({ _id: -1 });
            const totalUser = await User.countDocuments();
            res.status(200).json({ user, totalUser });
        } catch (error) {
            res.status(401).json("You are Not Allow");
        }
    }

});

// total User By month And Year
const totalUser = catchAsyncError(async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    if (req.user.isAdmin) {
        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                }, {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ]);
            res.status(200).json(data);
        } catch (error) {
            res.status(401).json("You are Not Allow");
        }
    }

});





export { deleteUser, updateUser, findAllUser, findUser, totalUser }










