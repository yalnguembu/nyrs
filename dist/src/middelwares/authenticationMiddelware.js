"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAgent = exports.isUserAdmin = exports.isUserConnected = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const isUserConnected = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "";
    const decodedToken = (0, utils_1.decodeToken)(token.substring(7));
    if (!token && decodedToken)
        next(new utils_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Please authenticate"));
    req.body.user = {
        id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id,
        email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email,
        role: "admin",
    };
    next();
};
exports.isUserConnected = isUserConnected;
const isUserAdmin = (req, res, next) => {
    if (req.body.user.role !== "admin")
        next(new utils_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "access forbbiden"));
    next();
};
exports.isUserAdmin = isUserAdmin;
const isUserAgent = (req, res, next) => {
    if (req.body.user.role !== "admin")
        next(new utils_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "access forbbiden"));
    next();
};
exports.isUserAgent = isUserAgent;
