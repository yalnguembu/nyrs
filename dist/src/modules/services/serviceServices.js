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
exports.ServiceServices = void 0;
const serviceModel_1 = require("./serviceModel");
const utils_1 = require("../../utils");
const Service_1 = require("./Service");
const http_status_codes_1 = require("http-status-codes");
class ServiceServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = (yield new serviceModel_1.serviceModel(data).save());
            return new Service_1.Service(service).details();
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield serviceModel_1.serviceModel.find();
        });
    }
    static getById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield serviceModel_1.serviceModel.findById(id))) !== null && _a !== void 0 ? _a : "";
        });
    }
    static getByName(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = (yield serviceModel_1.serviceModel.findOne({ name }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = serviceModel_1.serviceModel.findByIdAndUpdate(id, data);
            if (!service)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "incorrect category id");
            return service;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const succes = serviceModel_1.serviceModel.findByIdAndDelete(id);
            if (!succes)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "incorrect service id");
            return succes;
        });
    }
}
exports.ServiceServices = ServiceServices;
