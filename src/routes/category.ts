import { Router } from "express";

import trim from "../helpers/trim";

import {
  createCategory,
  fetchCategory,
  deleteCategory,
  editCategory,
} from "../controllers/category"; //category controller

import { adminMiddleware } from "../middleware/auth"; // admin authentication middleware

const router = Router();

//@desc create product category
//private route and only admin authorize
router.post("/", [adminMiddleware, trim], createCategory);

//@desc delete category
//private route and only admin authorize
router.delete("/:id", [adminMiddleware], deleteCategory);

//@desc delete category
//private route and only admin authorize
router.put("/:id", [adminMiddleware, trim], editCategory);

//@desc fetch product category
router.get("/", fetchCategory);

export default router;
