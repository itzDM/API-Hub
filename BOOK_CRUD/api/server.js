import express from "express";
import dotenv from "dotenv";
import db from "./dbConnect.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
db();


const app = express();

// Middleware......
app.use(express.json());


// Routes work Start

app.get("/", (req, res) => {
    res.send("...Api is Running");
});

app.use("/books", bookRoutes);



// Create a Server
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);
})

