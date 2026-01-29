"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarUser = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_lib_1 = require("../Lib/validation.lib");
const verificarToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader === undefined)
        return res.header(401).json({ datos: [], message: 'no autorizado', registros: 0 });
    const portadora = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[0];
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]) || '';
    if (portadora != process.env.SYS_PORTADORA || '')
        return res.header(401).json({ datos: [], message: 'no autorizado', registros: 0 });
    jsonwebtoken_1.default.verify(token, process.env.API_KEY || '', (err) => {
        if (err)
            return res.header(401).json({ datos: [], message: 'no autorizado', registros: 0 });
    });
    //console.log(jwt.decode(token)) //informacion el tiempo de vida
    next();
});
exports.verificarToken = verificarToken;
const verificarUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const { email, password } = user;
        if (!user)
            return res.header(401).json({ token: '', access: false, message: 'credencial invalida' });
        if (!email)
            return res.header(401).json({ token: '', access: false, message: 'credencial invalida' });
        if (!password)
            return res.header(401).json({ token: '', access: false, message: 'credencial invalida' });
        if (!(0, validation_lib_1.isEmailValide)(email))
            return res.header(401).json({ token: '', access: false, message: 'credencial invalida' });
    }
    catch (error) {
        return res.header(401).json({ token: '', access: false, message: 'credencial invalida' });
    }
    next();
});
exports.verificarUser = verificarUser;
