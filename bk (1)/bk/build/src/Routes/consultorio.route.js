"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultorio_ctrl_1 = __importDefault(require("../Controllers/consultorio.ctrl"));
//import { verificarToken,  } from '../Middleware/autentication.middle'
class Rutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.get(); // url
        this.post(); // body
        this.delete(); //delete ***
        this.put(); // insert
        this.patch(); // update
    }
    get() {
        this.router.get('/edificios', consultorio_ctrl_1.default.Edificios);
    }
    post() {
        this.router.post('/consultorios', consultorio_ctrl_1.default.Consultorios);
    }
    delete() {
    }
    put() {
        this.router.put('/register', consultorio_ctrl_1.default.InsertEdificios);
    }
    patch() {
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
