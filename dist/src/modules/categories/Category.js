"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(data) {
        this.data = data;
        this.details = () => {
            return {
                id: this.id,
                title: this.title,
                summary: this.summary,
            };
        };
        this.categorie = data;
    }
    get id() {
        var _a;
        return (_a = this.categorie._id) !== null && _a !== void 0 ? _a : "";
    }
    get title() {
        var _a;
        return (_a = this.categorie.title) !== null && _a !== void 0 ? _a : "";
    }
    get summary() {
        var _a;
        return (_a = this.categorie.summary) !== null && _a !== void 0 ? _a : "";
    }
}
exports.Category = Category;
