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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySevices = void 0;
const categoryModel_1 = require("./categoryModel");
const utils_1 = require("../../utils");
const Category_1 = require("./Category");
const http_status_codes_1 = require("http-status-codes");
class CategorySevices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = (yield new categoryModel_1.categoryModel(data).save());
            return new Category_1.Category(category).details();
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield categoryModel_1.categoryModel.find());
        });
    }
    static getByTile(title) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = (yield categoryModel_1.categoryModel.findOne({ title }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = categoryModel_1.categoryModel.findByIdAndUpdate(id, data);
            if (!category)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong categry id");
            return category;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const succes = categoryModel_1.categoryModel.findByIdAndDelete(id);
            if (!succes)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong category");
            return succes;
        });
    }
}
exports.CategorySevices = CategorySevices;
