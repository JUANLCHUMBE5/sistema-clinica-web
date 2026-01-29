"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class ServerWeb {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        this.app.listen(80, () => {
            console.log('server> STATUS > UP');
        });
    }
}
const server = new ServerWeb();
