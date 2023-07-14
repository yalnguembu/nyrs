"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(data) {
        this.details = () => {
            return {
                id: this.id,
                email: this.email,
                username: this.username,
                picture: this.picture,
                role: this.role,
            };
        };
        this.user = data;
    }
    get id() {
        var _a;
        return (_a = this.user._id) !== null && _a !== void 0 ? _a : "";
    }
    get email() {
        var _a;
        return (_a = this.user.email) !== null && _a !== void 0 ? _a : "";
    }
    get password() {
        var _a;
        return (_a = this.user.password) !== null && _a !== void 0 ? _a : "";
    }
    get username() {
        var _a;
        return (_a = this.user.username) !== null && _a !== void 0 ? _a : "";
    }
    get picture() {
        var _a;
        return (_a = this.user.picture) !== null && _a !== void 0 ? _a : "";
    }
    get role() {
        var _a;
        return (_a = this.user.role) !== null && _a !== void 0 ? _a : "";
    }
}
exports.User = User;
