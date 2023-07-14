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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_1 = require("../users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../../utils");
const http_status_codes_1 = require("http-status-codes");
const utils_2 = require("../../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthService {
    static register(crudentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hahsedPassword = yield bcrypt_1.default.hash(crudentials.password, salt);
            const { id, email, username, role } = yield prisma.user.create({
                data: {
                    username: crudentials.email,
                    email: crudentials.email,
                    password: hahsedPassword,
                },
            });
            const accessToken = (0, utils_1.encodeToken)({
                id,
                email,
                role,
            });
            return { id, email, username, accessToken, role };
        });
    }
    static login(userCrudential) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email: userCrudential.email },
            });
            if (!user)
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "wrong crudentials");
            const validate = yield bcrypt_1.default.compare(userCrudential.password, (_a = user.password) !== null && _a !== void 0 ? _a : "");
            if (!validate) {
                throw new utils_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "wrong crudentials");
            }
            const { id, email, username, role } = user;
            const accessToken = (0, utils_1.encodeToken)({
                id,
                email,
                role: role,
            });
            return { id, email, username, accessToken, role };
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_2.decodeToken)(token);
        });
    }
    static editPassowrd(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
            const { email, username, _id } = (yield users_1.userModel.findByIdAndUpdate(id, {
                $set: { password: hashedPassword },
            }, { new: true }));
            return { email, username, id: _id };
        });
    }
}
exports.AuthService = AuthService;
