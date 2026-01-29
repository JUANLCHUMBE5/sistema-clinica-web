"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_ctrl_1 = __importDefault(require("../Controllers/usuario.ctrl"));
const autentication_middle_1 = require("../Middleware/autentication.middle");
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
        this.router.get('/all', autentication_middle_1.verificarToken, usuario_ctrl_1.default.All); //todos la tabla
        //this.ruta.get('/:pk1/pk', ()=> { })
        //this.ruta.get('/:dni/dni', ()=> { })
        this.router.get('/:pagina/:registros/usuarios', autentication_middle_1.verificarToken, usuario_ctrl_1.default.PaginationxUsuario);
        this.router.get('/specialty', autentication_middle_1.verificarToken, usuario_ctrl_1.default.Specialty);
    }
    post() {
        this.router.post('/token', autentication_middle_1.verificarUser, usuario_ctrl_1.default.GeneratorToken);
        this.router.post('/refresh/token', autentication_middle_1.verificarToken, usuario_ctrl_1.default.RefreshToken);
        //busqueda usuario por filtro
        this.router.post('/filtro/usuario', usuario_ctrl_1.default.FiltroxUsuario);
    }
    put() {
        this.router.put('/insert', autentication_middle_1.verificarToken, usuario_ctrl_1.default.Register);
    }
    patch() {
        /** */
        this.router.patch('/save/usuario', autentication_middle_1.verificarToken, usuario_ctrl_1.default.GuardarUsuario);
    }
    delete() {
        this.router.delete('/delete/usuario', autentication_middle_1.verificarToken, usuario_ctrl_1.default.DeleteUsuario);
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
