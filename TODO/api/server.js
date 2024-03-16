import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";
import { db } from "./db.js";
import cors from "cors";

dotenv.config();
db();

const app = express();

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("...Api Is Running");
});

app.use("/user", userRoute);
app.use("/todo", todoRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is Running On ${port} `);
});