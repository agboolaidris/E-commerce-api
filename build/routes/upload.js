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
const express_1 = require("express");
const mail_1 = __importDefault(require("../helpers/mail"));
const multer_1 = __importDefault(require("../middleware/multer"));
const s3_1 = __importDefault(require("../middleware/s3"));
const router = express_1.Router();
router.post("/", [multer_1.default.array("photos")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files)
            return res.status(400).json({ error: "files most be upload" });
        res.json({ msg: "save!!!" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.post("/s3", (req, res, next) => {
    const file = s3_1.default.single("photo");
    file(req, res, (error) => {
        console.log(error);
        if (error)
            return res.status(500).json({ error: error });
        console.log(req.file);
        res.json(req.file);
    });
});
router.post("/mail", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, subject, msg, } = req.body;
    mail_1.default(email, msg, subject, name)
        .then(() => {
        return res.json({ msg: "sent" });
    })
        .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "not sent" });
    });
}));
exports.default = router;
//# sourceMappingURL=upload.js.map