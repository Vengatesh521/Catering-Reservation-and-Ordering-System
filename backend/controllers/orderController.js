import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;
    const order = new Order({ userId, products, totalPrice });
    await order.save();
    res.status(201).json({ message: "Order placed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: "User ID required" });

    const orders = await Order.find({ userId }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersForMyProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: "User ID required" });

    const orders = await Order.find()
      .populate("userId")
      .populate({
        path: "products.productId",
        populate: {
          path: "createdBy", // populate the user who created the product
          model: "User",
        },
      });

    const filtered = orders.filter((order) =>
      order.products.some(
        (p) => p.productId?.createdBy?._id?.toString() === userId
      )
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
