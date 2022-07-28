"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./api/routes/auth/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const conn = mongoose_1.default
    .connect("mongodb://localhost:27017/test")
    .then(() => console.log("Conneted to MongoDB"))
    .catch((err) => console.log({ message: "Error connect to MongoDB", err: err }));
app.use("/auth", auth_1.default);
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/apple", (req, res) => {
    console.log(req.body);
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server run at https://localhost:${port}`);
});
