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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValid = exports.registerValid = void 0;
const check_1 = require("../helpers/check");
const user_1 = require("../models/user");
const registerValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = {};
        const { username, email, password, confirmpassword, mobile } = req.body;
        if (!username)
            errors.username = "username is required";
        if (!email)
            errors.email = "email is required";
        if (!password)
            errors.password = "password is required";
        if (!confirmpassword)
            errors.confirmpassword = "confirmpassword is required";
        if (mobile && mobile.length < 11)
            errors.mobile = "mobile number most not less than 11 digit";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const checkUsername = yield user_1.User.findOne({ username });
        if (checkUsername)
            errors.username = "username already exist";
        const checkEmail = yield user_1.User.findOne({ email });
        if (checkEmail)
            errors.email = "email already exist";
        if (username.length < 3)
            errors.username = "username most be greater than 2 characters";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        if (password.length < 6)
            errors.password = "password length most be 6 character or more";
        if (!check_1.validateEmail(email))
            errors.email = "email is invalid";
        if (confirmpassword !== password)
            errors.confirmpassword = "password not match";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerValid = registerValid;
const loginValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = {};
        const { email, password } = req.body;
        if (!email)
            errors.email = "email is required";
        if (!password)
            errors.password = "password is required";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginValid = loginValid;
//# sourceMappingURL=authValid.js.map