import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vinex521:vinex521@cluster2.yha0uil.mongodb.net/Catering-System"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1); // Exit the process with failure
    });
};

export default connectDB;
