import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URL.replace(
    "<password>",
    process.env.MONGODB_PASSWORD
  );
  try {
    const connection = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
