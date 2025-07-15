import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrdersForMyProducts,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/my-orders", getMyOrders);
router.get("/all", getAllOrders);
router.put("/status/:id", updateOrderStatus);

router.get("/view-orders", getOrdersForMyProducts);

export default router;
