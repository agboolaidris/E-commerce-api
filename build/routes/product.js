"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trim_1 = __importDefault(require("../helpers/trim"));
const product_1 = require("../controllers/product");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../middleware/multer"));
const productValid_1 = require("../validations/productValid");
const router = express_1.Router();
//@desc create product
router.post("/", [auth_1.adminMiddleware, multer_1.default("array", "images", false), trim_1.default, productValid_1.productValid], product_1.createProduct);
//@desc fetch all products
router.get("/", product_1.fetchProducts);
//@desc fetch single product
router.get("/:id", product_1.fetchProduct);
//@desc fetch products by category
router.get("/category/:id", product_1.fetchProductsByCategory);
//@desc put all product
router.put("/:id", [auth_1.adminMiddleware, multer_1.default("array", "images", false), trim_1.default, productValid_1.productValidEdit], product_1.editProduct);
//@desc delete all product
router.delete("/:id", [auth_1.adminMiddleware], product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map