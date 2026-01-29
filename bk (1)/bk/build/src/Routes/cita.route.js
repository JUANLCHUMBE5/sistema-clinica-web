"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cita_ctrl_1 = __importDefault(require("../Controllers/cita.ctrl"));
const autentication_middle_1 = require("../Middleware/autentication.middle");
class Rutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.get();
        this.post();
        this.put();
        this.patch();
        this.delete();
    }
    get() {
        // por ahora nada
    }
    post() {
        // listar citas de un paciente
        this.router.post("/por-paciente", autentication_middle_1.verificarToken, cita_ctrl_1.default.PorPaciente);
    }
    put() {
        // guardar (insert / update)
        this.router.put("/guardar", autentication_middle_1.verificarToken, cita_ctrl_1.default.Guardar);
    }
    patch() { }
    delete() { }
}
const rutas = new Rutas();
exports.default = rutas.router;
