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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/category"));
const product_1 = __importDefault(require("./routes/product"));
//set env
dotenv_1.config();
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const PORT = 5000 || process.env.PORT;
    try {
        yield mongoose_1.default.connect("mongodb://localhost/db-template", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        //static files
        app.use(express_1.default.static(path_1.default.join(__dirname, "../uploads")));
        //routes
        app.use("/api/auth", auth_1.default);
        app.use("/api/category", category_1.default);
        app.use("/api/product", product_1.default);
        app.listen(PORT, () => {
            console.log(`app is listen on port ${PORT}!!!`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
Main();
//# sourceMappingURL=index.js.map