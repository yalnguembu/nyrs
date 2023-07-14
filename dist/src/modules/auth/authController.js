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
exports.AuthController = exports.router = void 0;
const authService_1 = require("./authService");
const _1 = require(".");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../utils");
const http_status_codes_1 = require("http-status-codes");
exports.router = require("express").Router();
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crudentials = new _1.AuthDTO();
                crudentials.email = req.body.email;
                crudentials.password = req.body.password;
                const errors = yield (0, class_validator_1.validate)(crudentials);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid crudentials");
                res.status(http_status_codes_1.StatusCodes.OK).send(yield authService_1.AuthService.login(crudentials));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crudentials = new _1.AuthDTO();
                crudentials.email = req.body.email;
                crudentials.password = req.body.password;
                const errors = yield (0, class_validator_1.validate)(crudentials);
                if (errors.length)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid crudentials");
                else
                    res
                        .status(http_status_codes_1.StatusCodes.CREATED)
                        .json(yield authService_1.AuthService.register(crudentials));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.accessToken;
                if (!token)
                    throw new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "please provide a token");
                yield authService_1.AuthService.verifyToken(token);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editPassowrd(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            const password = req.body.newPassword;
            if (!password) {
                next(new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password must be filled"));
            }
            else if (id && req.body.userId === id) {
                try {
                    res
                        .status(http_status_codes_1.StatusCodes.ACCEPTED)
                        .json(authService_1.AuthService.editPassowrd(id, password));
                }
                catch (error) {
                    next(error);
                }
            }
            else {
                next(new utils_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "wrong id"));
            }
        });
    }
}
exports.AuthController = AuthController;
