"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const ses = new aws_sdk_1.default.SES({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: "me-south-1",
});
const sendMail = (TO, msg, subject, name) => {
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
exports.default = sendMail;
//# sourceMappingURL=mail.js.map