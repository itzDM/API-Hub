import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataBase from "./config/database.js";
import authRouter from "./Routes/authRouter.js";
import userRouter from "./Routes/userRouter.js";
import movieRouter from "./Routes/movieRouter.js";
import listRouter from "./Routes/listRouter.js";


const app = express();

dotenv.config();
app.use(cors());
dataBase();

app.use(express.json());


app.get("/api/test", (req, res) => {
    res.send("Server is Running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/list", listRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server IS Running On ${process.env.PORT
        }`);
});

