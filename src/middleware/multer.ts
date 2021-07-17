import multer, { FileFilterCallback } from "multer";
import path from "path";

import { makeId } from "../helpers/makeId";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) => {
    cb(null, `-${makeId(10) + path.extname(file.originalname)}`);
  },
});

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

const upload = (type: "array" | "single", name: string, filter: boolean) => {
  if (type == "array" && filter) {
    return multer({ storage, fileFilter }).array(name);
  } else if (type == "array" && !filter) {
    return multer({ storage }).array(name);
  } else {
    return multer({ storage, fileFilter }).single(name);
  }
};

export default upload;
