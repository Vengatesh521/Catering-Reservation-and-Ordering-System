import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

//app configuration
const app = express();
const PORT = process.env.PORT || 5000;

//database connection
connectDB();

//middleware
app.use(
  cors({
    origin: [
      "https://catering-reservation-and-ordering-system-02d9.onrender.com/",
      "https://catering-reservation-and-ordering-s.vercel.app/",
    ], // Add both origins
    credentials: true,
  })
);

app.use(express.json()); // for parsing application/json
app.use(cookieParser());
//api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//database connection

app.get("/", (req, res) => {
  res.send("Welcome to the Catering Reservation and Ordering System API");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

//mongodb+srv://vinex521:55555566@cluster0.vreiufw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://vinex521:55555566@cluster0.vreiufw.mongodb.net/?
//https://full-stack-student-teacher-booking.onrender.com

//mongodb+srv://vinex521:vinex521@cluster2.yha0uil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2

//https://catering-reservation-and-ordering-system-02d9.onrender.com/
