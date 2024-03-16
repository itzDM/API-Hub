import mongoose from "mongoose";


export const db = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connect with ${connection.connection.host}`);

    } catch (error) {
        console.log(`error is ${error.message}`);
        process.exit();
    }
};