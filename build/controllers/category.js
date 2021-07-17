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
exports.editCategory = exports.deleteCategory = exports.fetchCategory = exports.createCategory = void 0;
const slug_1 = __importDefault(require("slug"));
const category_1 = require("../models/category");
const category_2 = __importDefault(require("../helpers/category"));
const product_1 = require("../models/product");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parentId } = req.body;
        if (!name)
            return res.status(400).json({ name: "name is required" });
        if (name.length < 2)
            return res
                .status(400)
                .json({ name: "name most be greater than 2 character" });
        const checkname = yield category_1.Category.findOne({ name });
        if (checkname)
            return res.status(400).json({ name: "name already exist" });
        const categoryObj = {
            name,
            slug: slug_1.default(req.body.name),
        };
        if (req.file) {
            categoryObj.image = `${process.env.API}${req.file.path.split("uploads")[1]}`;
        }
        if (req.body.parentId) {
            categoryObj.parentId = parentId;
        }
        const category = new category_1.Category(categoryObj);
        yield category.save();
        res.json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
const fetchCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield category_1.Category.find();
        if (data.length < 1)
            return res.status(401).json({ error: "nothing found in database" });
        const response = yield category_2.default(data);
        res.json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.fetchCategory = fetchCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkProduct = yield product_1.Product.find({ category: req.params.id });
        if (checkProduct.length > 0)
            return res.status(400).json({
                error: "can't delete a category that have product attached to it",
            });
        const checkSubCategory = yield category_1.Category.find({ parentId: req.params.id });
        if (checkSubCategory.length > 0) {
            checkSubCategory.map((category) => __awaiter(void 0, void 0, void 0, function* () {
                category.parentId = undefined;
                yield category.save();
            }));
        }
        // return res.status(400).json({
        //   error: "can't delete a category that have subCategory attached to it",
        // });
        const data = yield category_1.Category.findByIdAndDelete(req.params.id);
        if (!data)
            return res.status(404).json({ error: "no such a category in database" });
        res.json({ msg: "category deleted" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parentId } = req.body;
        if (!name)
            return res.status(400).json({ name: "name is required" });
        if (name.length < 2)
            return res
                .status(400)
                .json({ name: "name most be greater than 2 character" });
        const data = yield category_1.Category.findByIdAndUpdate(req.params.id, {
            name: name,
            slug: slug_1.default(name),
            parentId: parentId ? parentId : undefined,
        }, { new: true });
        if (!data)
            return res
                .status(401)
                .json({ error: "category doesn't exist in database" });
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.editCategory = editCategory;
//# sourceMappingURL=category.js.map