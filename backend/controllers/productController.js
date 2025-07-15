import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { name, description, price, imageUrl, createdBy } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string." });
  }
  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Description is required and must be a string." });
  }
  if (price === undefined || typeof price !== "number") {
    return res
      .status(400)
      .json({ error: "Price is required and must be a number." });
  }
  if (!imageUrl || typeof imageUrl !== "string") {
    return res
      .status(400)
      .json({ error: "Image URL is required and must be a string." });
  }
  if (!createdBy || typeof createdBy !== "string") {
    return res.status(400).json({ error: "createdBy (user ID) is required." });
  }

  const product = new Product({
    name,
    description,
    price,
    imageUrl,
    createdBy, // ✅ save it
  });

  await product.save();
  res.status(201).json({ message: "Product added" });
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "username");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

export const updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product updated" });
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
