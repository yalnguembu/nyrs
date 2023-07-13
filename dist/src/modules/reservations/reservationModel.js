"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReservationSchema = new mongoose_1.default.Schema({
    service: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        duration: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    client: {
        id: {
            type: String,
            require: true,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            require: true,
        },
    },
    maker: {
        type: String,
        required: true,
        default: "anyone",
    },
    isCanceled: {
        type: Boolean,
        require: true,
        default: false,
    },
});
const reservationModel = mongoose_1.default.model("reservation", ReservationSchema);
exports.reservationModel = reservationModel;
