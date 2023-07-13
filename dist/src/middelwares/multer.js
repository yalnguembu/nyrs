"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadServiceImage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, __dirname + "../../../../public/images/services");
    },
    filename: (_req, file, callback) => {
        const uid = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let extension = file.mimetype;
        extension = extension.split("/")[1];
        callback(null, `${uid}.${extension}`);
    },
});
exports.uploadServiceImage = (0, multer_1.default)({ storage });
