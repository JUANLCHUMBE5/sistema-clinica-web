"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_ctrl_1 = __importDefault(require("../Controllers/index.ctrl"));
class Rutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.get();
        this.post();
        this.delete();
    }
    get() {
        this.router.get('/', index_ctrl_1.default.Index);
        this.router.get('/users', index_ctrl_1.default.Users);
        this.router.get('/users/:id/user', index_ctrl_1.default.UsersxId);
    }
    post() {
        this.router.post('/users/create', index_ctrl_1.default.Create);
    }
    delete() {
        this.router.delete('/', (req, res) => { res.json({ saludo: 'hola mundo delete' }); });
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
