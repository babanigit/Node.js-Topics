"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
//socket.io setup
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
app.use(express_1.default.static("public"));
console.log(dirname);
app.get("/", (req, res) => {
    res.sendFile(dirname + "/public/index.html");
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(port, () => {
    console.log(`express serve is live on http://localhost:${port}`);
});
