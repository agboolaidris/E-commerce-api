"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const makeId_1 = require("../helpers/makeId");
const storage = multer_1.default.diskStorage({
    destination: "uploads",
    filename: (_, file, cb) => {
        cb(null, `-${makeId_1.makeId(10) + path_1.default.extname(file.originalname)}`);
    },
});
const fileFilter = (_, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg") {
        cb(null, true);
    }
    else {
        cb(new Error("image most be jpg/png/jpeg format"));
    }
};
const upload = (type, name, filter) => {
    if (type == "array" && filter) {
        return multer_1.default({ storage, fileFilter }).array(name);
    }
    else if (type == "array" && !filter) {
        return multer_1.default({ storage }).array(name);
    }
    else {
        return multer_1.default({ storage, fileFilter }).single(name);
    }
};
exports.default = upload;
//# sourceMappingURL=multer.js.map