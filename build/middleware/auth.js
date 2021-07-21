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
exports.adminMiddleware = exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies["access-token"];
        if (!cookie)
            return res.status(401).json({ error: "unathorize" });
        if (!process.env.JWT_SECRET)
            return res
                .status(500)
                .json({ error: "unathorized,jwt_secret is no provided" });
        const { _id, role } = jsonwebtoken_1.default.verify(cookie, process.env.JWT_SECRET);
        if (!_id)
            return res.status(400).json({ error: "unathorized,user verified fail" });
        if (role !== "user")
            return res
                .status(400)
                .json({ error: "unathorized,only user are allowed" });
        const user = yield user_1.User.findById(_id);
        if (!user)
            return res.status(400).json({ error: "unathorized,user not found" });
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.userMiddleware = userMiddleware;
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = yield req.cookies["access-token"];
        if (!cookie)
            return res.status(401).json({ error: "unathorize, kindly login" });
        if (!process.env.JWT_SECRET)
            return res
                .status(500)
                .json({ error: "unathorized,jwt_secret is no provided" });
        const { _id, role } = jsonwebtoken_1.default.verify(cookie, process.env.JWT_SECRET);
        if (!_id)
            return res.status(400).json({ error: "unathorized,user verified fail" });
        if (role !== "admin")
            return res
                .status(400)
                .json({ error: "unathorized,only admin are allowed" });
        const user = yield user_1.User.findById(_id);
        if (!user)
            return res.status(400).json({ error: "unathorized,user not found" });
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=auth.js.map