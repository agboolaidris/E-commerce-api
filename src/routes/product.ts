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
router.post(
  "/",
  [adminMiddleware, trim, productValid, upload("array", "images", true)],
  createProduct
);

//@desc fetch all products
router.get("/", fetchProducts);

//@desc fetch single product
router.get("/:id", fetchProduct);

//@desc fetch products by category
router.get("/category/:id", fetchProductsByCategory);

//@desc put all product
router.put(
  "/:id",
  [adminMiddleware, trim, productValidEdit, upload("array", "images", false)],
  editProduct
);

//@desc delete all product
router.delete("/:id", [adminMiddleware], deleteProduct);

export default router;
