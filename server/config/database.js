import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export const connectDb = async()=>{
    const {connection} = await mongoose.connect(process.env.URL);
    console.log(`Database is connected with ${connection.host}`);
}