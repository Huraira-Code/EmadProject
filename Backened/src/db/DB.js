import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // process.env.MONGODB_URI
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://huraira:Usama10091@cluster0.hnawam1.mongodb.net/foodSaviour"
    );
    console.log(
      `mongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongooDB connection error..");
    process.exit(1);
  }
};
export default connectDB;
