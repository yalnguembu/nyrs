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
exports.CategoryController = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const categoryServices_1 = require("./categoryServices");
const dto_1 = require("./dto");
class CategoryController {
    static create(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = new dto_1.CategoryDTO();
                category.title = (_a = req.body.title) !== null && _a !== void 0 ? _a : "";
                category.summary = (_b = req.body.summary) !== null && _b !== void 0 ? _b : "";
                const errors = yield (0, class_validator_1.validate)(category);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "bad request");
                const oldCategory = yield categoryServices_1.CategorySevices.getByTile(category.title);
                if (oldCategory)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "Existing category");
                res.status(200).json(yield categoryServices_1.CategorySevices.create(category));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield categoryServices_1.CategorySevices.getAll());
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const category = new dto_1.CategoryDTO();
                category.title = req.body.title;
                category.summary = req.body.summary;
                const errors = yield (0, class_validator_1.validate)(category);
                if (!id)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "category id must be provided");
                const oldCategory = yield categoryServices_1.CategorySevices.getByTile(category.title);
                if (oldCategory && oldCategory.summary == category.summary)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Nothing to update");
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong informations");
                res.status(200).json(yield categoryServices_1.CategorySevices.update(id, category));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "category id must be provided");
                if (yield categoryServices_1.CategorySevices.delete(id))
                    res.status(200).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
