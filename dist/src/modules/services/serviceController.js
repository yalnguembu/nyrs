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
exports.ServiceController = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const serviceServices_1 = require("./serviceServices");
const dto_1 = require("./dto");
class ServiceController {
    static create(req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new dto_1.ServiceDTO();
                service.name = (_a = req.body.name) !== null && _a !== void 0 ? _a : "";
                service.description = (_b = req.body.description) !== null && _b !== void 0 ? _b : "";
                service.category = (_c = req.body.category) !== null && _c !== void 0 ? _c : "";
                service.picture = (_d = req.file) === null || _d === void 0 ? void 0 : _d.filename;
                service.price = parseInt((_e = req.body.price) !== null && _e !== void 0 ? _e : 0);
                service.duration = parseInt((_f = req.body.duration) !== null && _f !== void 0 ? _f : 0);
                const errors = yield (0, class_validator_1.validate)(service);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "bad request");
                const oldService = yield serviceServices_1.ServiceServices.getByName(service.name);
                if (oldService)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "Existing service");
                res.status(200).json(yield serviceServices_1.ServiceServices.create(service));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield serviceServices_1.ServiceServices.getAll());
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
    static getById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = req.params.id) !== null && _a !== void 0 ? _a : "";
                if (!id)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                res.status(200).json(yield serviceServices_1.ServiceServices.getById(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = req.params.id) !== null && _a !== void 0 ? _a : "";
                const service = new dto_1.ServiceDTO();
                service.name = (_b = req.body.name) !== null && _b !== void 0 ? _b : "";
                service.description = (_c = req.body.description) !== null && _c !== void 0 ? _c : "";
                service.picture = (_d = req.file) === null || _d === void 0 ? void 0 : _d.filename;
                service.price = parseInt((_e = req.body.price) !== null && _e !== void 0 ? _e : 1);
                service.duration = parseInt((_f = req.body.duration) !== null && _f !== void 0 ? _f : 1);
                service.category = (_g = req.body.category) !== null && _g !== void 0 ? _g : "";
                const errors = yield (0, class_validator_1.validate)(service);
                if (!id)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                const oldService = yield serviceServices_1.ServiceServices.getById(id);
                if ((0, utils_1.areBothObjectsEqual)(oldService, service))
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Nothing to update");
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong informations");
                res.status(200).json(yield serviceServices_1.ServiceServices.update(id, service));
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
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                if (yield serviceServices_1.ServiceServices.delete(id))
                    res.status(200).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ServiceController = ServiceController;
