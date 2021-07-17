"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trim_1 = __importDefault(require("../helpers/trim"));
const category_1 = require("../controllers/category");
const auth_1 = require("../middleware/auth");
const router = express_1.Router();
//@desc create product category
router.post("/", [auth_1.adminMiddleware, trim_1.default], category_1.createCategory);
//@desc delete category
router.delete("/:id", [auth_1.adminMiddleware], category_1.deleteCategory);
//@desc delete category
router.put("/:id", [auth_1.adminMiddleware, trim_1.default], category_1.editCategory);
//@desc fetch product category
router.get("/", category_1.fetchCategory);
exports.default = router;
//# sourceMappingURL=category.js.map