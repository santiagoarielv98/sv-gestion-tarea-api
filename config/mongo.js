import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // reset 
      
    });
    console.log("MongoDB connected");
  } catch (error) {
    await mongoose.disconnect();
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDB;
