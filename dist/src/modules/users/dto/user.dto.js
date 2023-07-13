"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const class_validator_1 = require("class-validator");
class UserDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UserDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)()
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UserDTO.prototype, "picture", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UserDTO.prototype, "role", void 0);
exports.UserDTO = UserDTO;
