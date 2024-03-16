import List from "../Models/listModel.js";
import catchAsyncError from "../Middleware/catchAsyncError.js";


// list create

const createList = catchAsyncError(async (req, res) => {

    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const saveList = await newList.save();
            res.status(200).json(saveList);
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

});

// delete list

const deleteList = catchAsyncError(async (req, res) => {

    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successful");
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

});

// get all list

const allList = catchAsyncError(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const list = await List.find().sort({ _id: -1 });
            res.status(200).json(list);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
});



// get all by genre and type

const findByQuery = catchAsyncError(async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 5 } }]);
        };

        res.status(200).json(list);


    } catch (error) {
        res.status(500).json(error.message);
    }



});





export { createList, deleteList, allList, findByQuery };