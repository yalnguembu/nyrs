"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(data) {
        this.data = data;
        this.service = data;
    }
    get name() {
        var _a;
        return (_a = this.service.name.trim()) !== null && _a !== void 0 ? _a : "";
    }
    get description() {
        var _a;
        return ((_a = this.service.description) !== null && _a !== void 0 ? _a : "").trim();
    }
    get category() {
        var _a;
        return ((_a = this.service.category) !== null && _a !== void 0 ? _a : "").trim();
    }
    get picture() {
        var _a;
        return ((_a = this.service.picture) !== null && _a !== void 0 ? _a : "service-default.png").trim();
    }
    get price() {
        var _a;
        return (_a = this.service.price) !== null && _a !== void 0 ? _a : 0;
    }
    get duration() {
        var _a;
        return (_a = this.service.duration) !== null && _a !== void 0 ? _a : 0;
    }
    details() {
        return {
            name: this.name,
            description: this.description,
            category: this.category,
            picture: this.picture,
            price: this.price,
            duration: this.duration,
        };
    }
}
exports.Service = Service;
