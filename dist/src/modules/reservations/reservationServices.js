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
exports.ReservationServices = void 0;
const reservationModel_1 = require("./reservationModel");
const utils_1 = require("../../utils");
const Reservation_1 = require("./Reservation");
const http_status_codes_1 = require("http-status-codes");
class ReservationServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = (yield new reservationModel_1.reservationModel(data).save());
            return new Reservation_1.Reservation(service).details();
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date().toISOString();
            return ((_a = (yield reservationModel_1.reservationModel.find({
                date: {
                    $gt: today,
                },
            }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static getArchived() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date().toISOString();
            return ((_a = (yield reservationModel_1.reservationModel.find({
                date: {
                    $lt: today,
                },
            }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static getArchivedByUserId(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date().toISOString();
            return ((_a = (yield reservationModel_1.reservationModel.find({
                date: {
                    $lt: today,
                },
                "client.id": userId,
            }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static getByUserId(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date().toISOString();
            return ((_a = (yield reservationModel_1.reservationModel.find({
                "client.id": userId,
                date: {
                    $gt: today,
                },
            }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static getById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield reservationModel_1.reservationModel.findById(id))) !== null && _a !== void 0 ? _a : "";
        });
    }
    static getByName(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = (yield reservationModel_1.reservationModel.findOne({
                name,
            }))) !== null && _a !== void 0 ? _a : "");
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield reservationModel_1.reservationModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            if (!service)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "incorrect reservation id");
            return service;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const succes = reservationModel_1.reservationModel.findByIdAndDelete(id);
            if (!succes)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "incorrect service id");
            return succes;
        });
    }
    static cancel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const succes = reservationModel_1.reservationModel.findByIdAndUpdate(id, {
                isCanceled: true,
            }, {
                new: true,
            });
            if (!succes)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "incorrect service id");
            return succes;
        });
    }
}
exports.ReservationServices = ReservationServices;
