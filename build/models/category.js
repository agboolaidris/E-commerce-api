"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    slug: { type: String, unique: true, required: true },
    image: { type: String },
    parentId: { type: String },
}, { timestamps: true });
exports.Category = mongoose_1.model("Category", schema);
//# sourceMappingURL=category.js.map