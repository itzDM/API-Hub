import mongoose from "mongoose";


const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database Connect With ${connect.connection.host}`);
    } catch (error) {
        console.log(`error is -${error.message}`);
        process.exit();
    }
};

export default db;