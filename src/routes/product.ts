import { Router } from "express";

import trim from "../helpers/trim";

import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory,
} from "../controllers/product"; //product controller

import { adminMiddleware } from "../middleware/auth"; //admin authentication middleware
import upload from "../middleware/multer"; // multer multipart from middleware
import { productValid, productValidEdit } from "../validations/productValid"; //product validation middleware

const router = Router();

//@desc create product
//private route and only admin authorize
router.post(
  "/",
  [adminMiddleware, upload("array", "images", false), trim, productValid],
  createProduct
);

//@desc fetch all products
router.get("/", fetchProducts);

//@desc fetch single product
router.get("/:id", fetchProduct);

//@desc fetch products by category
router.get("/category/:id", fetchProductsByCategory);

//@desc put all product
//private route and only admin authorize
router.put(
  "/:id",
  [adminMiddleware, upload("array", "images", false), trim, productValidEdit],
  editProduct
);

//@desc delete all product
//private route and only admin authorize
router.delete("/:id", [adminMiddleware], deleteProduct);

export default router;
