"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const auth_1 = require("../services/auth");
// import { UserController } from "../services/users";
const delivery_1 = require("../services/delivery");
const middelwares_1 = require("../middelwares");
const utils_1 = require("../utils");
exports.router = (0, express_1.Router)();
exports.router.post("/auth/signin", auth_1.AuthController.login);
exports.router.post("/auth/signup", auth_1.AuthController.register);
exports.router.post("/auth/verify-token", auth_1.AuthController.verifyToken);
exports.router.use("/storage", express_2.default.static("public"));
// router.get("/user/:id", isUserConnected, UserController.getById);
// router.put("/user/:id", isUserConnected, UserController.update);
// router.delete("/user/:id", isUserConnected, UserController.delete);
// router.get("/users", isUserConnected, isUserAdmin, UserController.getAll);
exports.router.post("/deliveries", middelwares_1.isUserConnected, delivery_1.DeliveryController.create);
exports.router.get("/deliveries", middelwares_1.isUserConnected, delivery_1.DeliveryController.getAll);
// router.put("/deliveries/:id", isUserConnected, DeliveryController.update);
// router.delete("/deliveries/:id", isUserConnected, DeliveryController.delete);
exports.router.get("/deliveries/:id", middelwares_1.isUserConnected, delivery_1.DeliveryController.getById);
exports.router.get("/deliveries/:id/grocer", middelwares_1.isUserConnected, delivery_1.DeliveryController.getByGrocer);
exports.router.get("/deliveries/:id/deliverer", middelwares_1.isUserConnected, delivery_1.DeliveryController.getByGrocer);
exports.router.put("/deliveries/:id/pick-up", middelwares_1.isUserConnected, delivery_1.DeliveryController.pickUp);
exports.router.put("/deliveries/:id/moving", middelwares_1.isUserConnected, delivery_1.DeliveryController.moving);
exports.router.put("/deliveries/:id/done", middelwares_1.isUserConnected, delivery_1.DeliveryController.done);
exports.router.use("*", (req, res, next) => {
    next(new utils_1.NotFoundError(`'${req.baseUrl}'`));
});
exports.router.use(utils_1.ErrorHandler.handle());
