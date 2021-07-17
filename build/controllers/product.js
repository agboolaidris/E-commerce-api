"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.fetchProductsByCategory = exports.fetchProduct = exports.fetchProducts = exports.editProduct = exports.createProduct = void 0;
const fs_1 = __importDefault(require("fs"));
const product_1 = require("../models/product");
const slug_1 = __importDefault(require("slug"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files)
            return res.status(400).json({
                image: "images is required and most be in jpeg/jpg/png format",
            });
        req.body.files = req.files;
        const { price, description, category, name, quantity, offer, files } = req.body;
        let images = [];
        images = files.map((file) => {
            return `${process.env.BASE_URL}${file.path.split("uploads")[1]}`;
        });
        const product = new product_1.Product({
            name,
            slug: slug_1.default(name),
            price,
            createdBy: res.locals.user._id,
            description,
            images,
            quantity,
            category,
            offer: offer ? offer : undefined,
        });
        const response = yield product.save();
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.files = req.files ? req.files : undefined;
        const { price, description, category, name, quantity, offer, files } = req.body;
        let images = [];
        if (files) {
            images = files.map((file) => {
                return `${process.env.BASE_URL}${file.path.split("uploads")[1]}`;
            });
        }
        const data = yield product_1.Product.findById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "product not found" });
        const edit = {
            name,
            slug: slug_1.default(name),
            price,
            createdBy: res.locals.user._id,
            description,
            quantity,
            category,
            offer: offer ? offer : null,
        };
        if (images.length > 0) {
            edit.images = images;
            data.images.map((image) => {
                fs_1.default.unlinkSync(`uploads/-${image.split("-")[1]}`);
            });
        }
        const response = yield product_1.Product.findByIdAndUpdate(req.params.id, edit, {
            new: true,
        });
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editProduct = editProduct;
const fetchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield product_1.Product.find();
        return res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchProducts = fetchProducts;
const fetchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield product_1.Product.findById(req.params.id);
        return res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchProduct = fetchProduct;
const fetchProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield product_1.Product.find({ category: req.params.id });
        return res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchProductsByCategory = fetchProductsByCategory;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_1.Product.findById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "product not found" });
        data.images.map((image) => {
            fs_1.default.unlinkSync(`uploads/-${image.split("-")[1]}`);
        });
        const response = yield product_1.Product.findByIdAndDelete(req.params.id);
        if (!response)
            return res.status(404).json({ error: "product not found" });
        return res.json({ msg: "product deleted!!!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map