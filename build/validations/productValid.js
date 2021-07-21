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
exports.productValidEdit = exports.productValid = void 0;
const category_1 = require("../models/category");
const product_1 = require("../models/product");
const fs_1 = __importDefault(require("fs"));
const productValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.files = req.files ? req.files : undefined;
        const { name, description, price, quantity, category, offer, files } = req.body;
        const error = {};
        if (req.files == undefined || req.files.length < 1)
            error.images = "images is required and most be in jpeg/jpg/png format";
        if (!name)
            error.name = "name of the product is required";
        if (!description)
            error.description = "description of the product is required";
        if (!price)
            error.price = "name of the product is required";
        if (!quantity)
            error.quantity = "quantity of the product is required";
        if (!category)
            error.category = "category of the product is required";
        if (Object.keys(error).length > 0) {
            if (req.files !== undefined) {
                files.map((file) => {
                    fs_1.default.unlinkSync(`uploads/${file.path.split("uploads")[1]}`);
                });
            }
            return res.status(400).json(error);
        }
        const confirmName = yield product_1.Product.findOne({ name });
        if (confirmName)
            error.name = "name already exist";
        if (!confirmName && name.length <= 1)
            error.name = "name must be two or more characters";
        const confirmCategory = yield category_1.Category.findById(category);
        if (!confirmCategory)
            error.category = "category id is invalid";
        if (description.length < 20)
            error.description = "description must be grater than 10 character";
        if (isNaN(price) || price < 1)
            error.price = "price most be a number and most be greater than 0";
        if (isNaN(quantity) || quantity < 1)
            error.quantity = "quantity most be a number and most be greater than 0";
        if ((offer && isNaN(offer)) || offer < 1)
            error.offer = "quantity most be a number and most be greater than 0";
        if (Object.keys(error).length > 0) {
            if (req.files !== undefined) {
                files.map((file) => {
                    fs_1.default.unlinkSync(`uploads/${file.path.split("uploads")[1]}`);
                });
            }
            return res.status(400).json(error);
        }
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.productValid = productValid;
const productValidEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, quantity, category, offer } = req.body;
        const error = {};
        if (!name)
            error.name = "name of the product is required";
        if (!description)
            error.description = "description of the product is required";
        if (!price)
            error.price = "name of the product is required";
        if (!quantity)
            error.quantity = "quantity of the product is required";
        if (!category)
            error.category = "category of the product is required";
        if (Object.keys(error).length > 0)
            return res.status(400).json(error);
        if (name.length <= 1)
            error.name = "name must be two or more characters";
        if (description.length < 20)
            error.description = "description must be grater than 10 character";
        if (isNaN(price) || price < 1)
            error.price = "price most be a number and most be greater than 0";
        if (isNaN(quantity) || quantity < 1)
            error.quantity = "quantity most be a number and most be greater than 0";
        if ((offer && isNaN(offer)) || offer < 1)
            error.offer = "quantity most be a number and most be greater than 0";
        if (Object.keys(error).length > 0)
            return res.status(400).json(error);
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.productValidEdit = productValidEdit;
//# sourceMappingURL=productValid.js.map