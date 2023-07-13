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
exports.UserSevices = void 0;
const userModel_1 = require("./userModel");
const users_1 = require("../users/");
class UserSevices {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, _id, picture } = (yield userModel_1.userModel.findById(id));
            return { email, username, id: _id, picture };
        });
    }
    static getByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const finedUser = yield userModel_1.userModel.findOne({
                email: userEmail,
            }).exec();
            if (finedUser)
                return new users_1.User(finedUser).details();
            return "";
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (yield userModel_1.userModel.find());
            return users.map((user) => {
                const { email, username, _id, role, picture } = user;
                return { email, username, id: _id, role, picture };
            });
        });
    }
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, _id } = (yield userModel_1.userModel.findByIdAndUpdate(id, { $set: user }, { new: true }));
            return { email, username, id: _id };
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.userModel.findByIdAndDelete(id);
        });
    }
}
exports.UserSevices = UserSevices;
