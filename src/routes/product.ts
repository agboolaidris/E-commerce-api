import { Router } from "express";

import trim from "../helpers/trim";

import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory,
} from "../controllers/product";

import { adminMiddleware } from "../middleware/auth";
import upload from "../middleware/multer";
import { productValid, productValidEdit } from "../validations/productValid";

const router = Router();

//@desc create product
router.post("/", [adminMiddleware], createProduct);

//@desc fetch all products
router.get("/", fetchProducts);

//@desc fetch single product
router.get("/:id", fetchProduct);

//@desc fetch products by category
router.get("/category/:id", fetchProductsByCategory);

//@desc put all product
router.put(
  "/:id",
  [adminMiddleware, trim, upload("array", "images", false), productValidEdit],
  editProduct
);

//@desc delete all product
router.delete("/:id", [adminMiddleware], deleteProduct);

export default router;
