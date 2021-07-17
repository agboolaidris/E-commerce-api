import aws from "aws-sdk";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import { config } from "dotenv";
import { makeId } from "../helpers/makeId";
config();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };

const fileFilter = (_: any, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("image most be jpg/png/jpeg format"));
  }
};

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

const s3Upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "my-nodejs-template-s3bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, makeId(10) + file.originalname);
    },
  }),
});

s3.deleteObject({ Bucket: "bucket-name", Key: "image.jpg" }, (err, data) => {
  console.error(err);
  console.log(data);
});

export default s3Upload;
