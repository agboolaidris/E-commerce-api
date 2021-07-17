import aws from "aws-sdk";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import { config } from "dotenv";
import { makeId } from "../helpers/makeId";
import { String } from "aws-sdk/clients/cloudtrail";
config();

const ses = new aws.SES({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: "me-south-1",
});
const sendMail = (TO: string, msg: string, subject: string, name: String) => {
  var params = {
    Destination: {
      ToAddresses: [TO],
    },
    Message: {
      Body: {
        Text: { Data: "From Contact Form: " + name + "\n " + msg },
      },

      Subject: { Data: "From: Agboola Amazon test " },
    },
    Source: "agboolaisholaidreez@gmail.com",
  };

  return ses.sendEmail(params).promise();
};

export default sendMail;
