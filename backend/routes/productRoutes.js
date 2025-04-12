import express from "express";
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", isLoggedIn, isAdmin, createProduct);
router.put('/:id',isLoggedIn, isAdmin, updateProduct);
router.delete('/:id',isLoggedIn, isAdmin, deleteProduct);
export default router;