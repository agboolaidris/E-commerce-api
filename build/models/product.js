"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    offer: { type: Number },
    images: [{ type: String, required: true }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
exports.Product = mongoose_1.model("Product", schema);
//# sourceMappingURL=product.js.map