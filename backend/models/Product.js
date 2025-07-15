import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 new
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
