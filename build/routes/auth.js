"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trim_1 = __importDefault(require("../helpers/trim"));
const adminAuth_1 = require("../controllers/auth/adminAuth");
const userAuth_1 = require("../controllers/auth/userAuth");
const authValid_1 = require("../validations/authValid");
const auth_1 = require("../middleware/auth");
const router = express_1.Router();
//@desc register
router.post("/admin/register", [trim_1.default, authValid_1.registerValid], adminAuth_1.AdminRegister);
router.post("/user/register", [trim_1.default, authValid_1.registerValid], userAuth_1.UserRegister);
//@desc login
router.post("/admin/login", [trim_1.default, authValid_1.loginValid], adminAuth_1.AdminLogin);
router.post("/user/login", [trim_1.default, authValid_1.loginValid], userAuth_1.UserLogin);
//@desc isme
router.get("/admin/isme", [auth_1.adminMiddleware], adminAuth_1.AdminIsMe);
router.get("/user/isme", [auth_1.userMiddleware], userAuth_1.UserIsMe);
//@desc logout
router.get("/admin/logout", [auth_1.adminMiddleware], adminAuth_1.AdminLogout);
router.get("/user/logout", [auth_1.userMiddleware], userAuth_1.UserLogout);
exports.default = router;
//# sourceMappingURL=auth.js.map