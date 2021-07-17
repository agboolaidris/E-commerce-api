"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = require("dotenv");
const makeId_1 = require("../helpers/makeId");
dotenv_1.config();
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };
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
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
});
const s3Upload = multer_1.default({
    fileFilter,
    storage: multer_s3_1.default({
        s3,
        bucket: "my-nodejs-template-s3bucket",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, makeId_1.makeId(10) + file.originalname);
        },
    }),
});
s3.deleteObject({ Bucket: "bucket-name", Key: "image.jpg" }, (err, data) => {
    console.error(err);
    console.log(data);
});
exports.default = s3Upload;
//# sourceMappingURL=s3.js.map