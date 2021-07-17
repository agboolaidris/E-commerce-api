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
exports.AdminIsMe = exports.AdminLogout = exports.AdminLogin = exports.AdminRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const user_1 = require("../../models/user");
const AdminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, email, password, mobile } = req.body;
        const adminProps = {
            username,
            email,
            password,
            role: "admin",
        };
        if (mobile) {
            adminProps["mobile"] = mobile;
        }
        const newAdmin = new user_1.User(adminProps);
        yield newAdmin.save();
        return res.json({ msg: "register successful" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AdminRegister = AdminRegister;
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ email: "email is invalid" });
        const confirmPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!confirmPassword)
            return res.status(400).json({ password: "password is invalid" });
        if (user.role !== "admin")
            return res.status(400).json({ error: "only admin is authorized" });
        if (!process.env.JWT_SECRET)
            return res.status(500).json({ error: "jwt_secret is no provided" });
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.set("Set-Cookie", cookie_1.default.serialize("access-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
        }));
        return res.json({ msg: "login successful" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AdminLogin = AdminLogin;
const AdminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access-token").json({ msg: "logout successful" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AdminLogout = AdminLogout;
const AdminIsMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(res.locals.user._id).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.AdminIsMe = AdminIsMe;
//# sourceMappingURL=adminAuth.js.map