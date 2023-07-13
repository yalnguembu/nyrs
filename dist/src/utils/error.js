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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.NotFoundError = exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiError extends Error {
    constructor(statusCode, message, rawsErrors) {
        super(message);
        this.statusCode = statusCode;
        this.rawsErrors = rawsErrors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class NotFoundError extends ApiError {
    constructor(path) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, `The requested path ${path} not found!`);
    }
}
exports.NotFoundError = NotFoundError;
class ErrorHandler {
}
exports.ErrorHandler = ErrorHandler;
_a = ErrorHandler;
ErrorHandler.handle = () => {
    return (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send({
            success: false,
            message: error.message,
            // stack: error.stack,
            rawsError: (_b = error.rawsErrors) !== null && _b !== void 0 ? _b : [],
        });
    });
};
