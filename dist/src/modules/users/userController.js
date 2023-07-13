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
exports.UserController = void 0;
const userServices_1 = require("./userServices");
const dto_1 = require("./dto");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
class UserController {
    static getById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (userId) {
                try {
                    const user = yield userServices_1.UserSevices.getById(userId);
                    if (user)
                        res.status(200).json(user);
                    else
                        res.status(422).json("user not found");
                }
                catch (error) {
                    next(error);
                }
            }
            else
                next(new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "user id must be provided"));
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userServices_1.UserSevices.getAll();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (userId && !req.body.password) {
                const user = new dto_1.UserDTO();
                if (req.body.username)
                    user.username = req.body.username;
                if (req.body.email)
                    user.email = req.body.email;
                if (req.body.picture)
                    user.picture = req.body.picture;
                try {
                    const updatedUser = yield userServices_1.UserSevices.update(userId, user);
                    if (updatedUser)
                        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(updatedUser);
                    else
                        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json("user not found");
                }
                catch (error) {
                    next(error);
                }
            }
            else
                next(new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "user must be provided"));
        });
    }
    static delete(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (userId && !req.body.password) {
                try {
                    if (yield userServices_1.UserSevices.delete(userId))
                        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ success: true });
                    else
                        next(new utils_1.ApiError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "user not found"));
                }
                catch (error) {
                    next(error);
                }
            }
            else
                next(new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "user id must be provide"));
        });
    }
}
exports.UserController = UserController;
