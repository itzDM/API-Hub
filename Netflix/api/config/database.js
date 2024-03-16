import mongoose from "mongoose";

const dataBase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database Connected With ${connect.connection.host}`);

    }
    catch (err) {
        console.log(`Error- ${err.message}`);
        process.exit();
    }
};

export default dataBase


