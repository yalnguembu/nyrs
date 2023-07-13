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
exports.ReservationController = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const reservationServices_1 = require("./reservationServices");
const dto_1 = require("./dto");
const users_1 = require("../users");
const updateReservation_dto_1 = require("./dto/updateReservation.dto");
class ReservationController {
    static create(req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservation = new dto_1.ReservationDTO();
                reservation.service = (_a = req.body.service) !== null && _a !== void 0 ? _a : "";
                reservation.date = (_b = req.body.date) !== null && _b !== void 0 ? _b : "";
                reservation.time = (_c = req.body.time) !== null && _c !== void 0 ? _c : "";
                reservation.client = (_d = req.body.client) !== null && _d !== void 0 ? _d : "";
                reservation.maker = (_e = req.body.maker) !== null && _e !== void 0 ? _e : "";
                const errors = yield (0, class_validator_1.validate)(reservation);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "bad request");
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.create(reservation));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query["user-id"];
            try {
                if (userId) {
                    res
                        .status(http_status_codes_1.StatusCodes.ACCEPTED)
                        .json(yield reservationServices_1.ReservationServices.getByUserId(userId));
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.ACCEPTED)
                        .json(yield reservationServices_1.ReservationServices.getAll());
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getArchived(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query["user-id"];
            try {
                if (userId) {
                    res
                        .status(http_status_codes_1.StatusCodes.ACCEPTED)
                        .json(yield reservationServices_1.ReservationServices.getArchivedByUserId(userId));
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.ACCEPTED)
                        .json(yield reservationServices_1.ReservationServices.getArchived());
                }
            }
            catch (error) {
                next(error);
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
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.getById(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getByUserId(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.query.id) !== null && _a !== void 0 ? _a : "";
                if (!userId)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                const user = yield users_1.UserSevices.getById(userId);
                if (!user)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong user id");
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.getByUserId(userId));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = req.params.id) !== null && _a !== void 0 ? _a : "";
                if (!id)
                    new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                const reservation = new updateReservation_dto_1.UpdateReservationDTO();
                reservation.service = (_b = req.body.service) !== null && _b !== void 0 ? _b : "";
                reservation.date = (_c = req.body.date) !== null && _c !== void 0 ? _c : "";
                reservation.time = (_d = req.body.time) !== null && _d !== void 0 ? _d : "";
                const errors = yield (0, class_validator_1.validate)(reservation);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong informations");
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.update(id, reservation));
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
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.cancel(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static cancel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "service id must be provided");
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json(yield reservationServices_1.ReservationServices.cancel(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ReservationController = ReservationController;
