"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    summary: {
        type: String,
    },
});
const categoryModel = mongoose_1.default.model("category", CategorySchema);
exports.categoryModel = categoryModel;
