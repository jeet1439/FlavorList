import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/:userId', getOrders);

export default router;
