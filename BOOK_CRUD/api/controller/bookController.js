import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Book from "../models/bookModel.js";

// Creates a new book in the collection.

export const createNewBook = catchAsyncError(async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description
        });

        const book = await newBook.save();
        return res.status(200).json(book);


    } catch (error) {
        return res.status(500).json(error.message);
    }
});


//  Retrieves a list of all books in the collection

export const getAllBook = catchAsyncError(async (req, res) => {
    try {
        const books = await Book.find().sort({ _id: -1 });

        if (books.length == 0) return res.status(200).json("No Book Found, Please Add a Book ");

        return res.status(200).json(books);

    } catch (error) {
        res.status(500).json(error.message);
    }
});




// Retrieves a specific book by ID.

export const getBookById = catchAsyncError(async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json("No Book Found");
        return res.status(200).json(book);

    } catch (error) {
        res.status(500).json(error.message);
    }
});


// Updates an existing book by ID.

export const updateBookById = catchAsyncError(async (req, res) => {
    try {
        if (!Object.keys(req.body).length) return res.status(400).json("Somethings Went Wrong");
        const book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body });
        if (!book) return res.status(404).json("No Book Found");
        return res.status(200).json({ message: "Book Update Successfully", book });

    } catch (error) {
        return res.status(500).json(error.message);

    }
});


// Deletes a book by ID.
export const deleteBookById = catchAsyncError(async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json("No Book Found");
        return res.status(200).json("Book Deleted Successfully");
    } catch (error) {
        res.status(500).json(error.message);
    }
});





