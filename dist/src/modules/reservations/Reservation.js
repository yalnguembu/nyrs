"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    constructor(data) {
        this.data = data;
        this.reservation = data;
    }
    get service() {
        return this.reservation.service;
    }
    get date() {
        return this.reservation.date.trim();
    }
    get time() {
        return this.reservation.time.trim();
    }
    get client() {
        return this.reservation.client;
    }
    get maker() {
        return this.reservation.maker;
    }
    details() {
        return {
            service: this.service,
            date: this.date,
            time: this.time,
            client: this.client,
            maker: this.maker,
        };
    }
}
exports.Reservation = Reservation;
