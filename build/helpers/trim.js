"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, _, next) => {
    const expection = [""];
    Object.keys(req.body).forEach((key) => {
        if (!expection.includes(key) && typeof req.body[key] === "string") {
            req.body[key] = req.body[key].trim();
        }
    });
    next();
};
//# sourceMappingURL=trim.js.map