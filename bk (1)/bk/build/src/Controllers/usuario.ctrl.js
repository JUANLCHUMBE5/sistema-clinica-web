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
const usuario_data_1 = __importDefault(require("../Data/usuario.data"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Ctrl {
    All(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rst, message } = yield usuario_data_1.default.All();
            return res.header(200).json({ datos: rst, message, registros: rst.length });
        });
    }
    FiltroxUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, apellidos, category_pk1 } = req.body;
            const { rst, message } = yield usuario_data_1.default.EjecutaSql(usuario_data_1.default.FilterxUsuarioxApellido(usuario_data_1.default.FiltroxUsuarioxDni(usuario_data_1.default.FiltroxUsuarioxCategoria(usuario_data_1.default.FiltroxUsuario(), category_pk1), dni), apellidos));
            return res.header(200).json({ datos: rst, message, registros: rst.length });
        });
    }
    /**TOKEN**/
    GeneratorToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            const { email, password } = user;
            const { rst, message } = yield usuario_data_1.default.FindxEmail(email);
            if (rst.length !== 1)
                return res.header(200).json({ token: '', access: false, message: 'credencial invalida' });
            if (rst.length === 0 && message.length === 0)
                return res.header(200).json({ token: '', message: 'credencial invalida' });
            if (rst.length === 0 && message.length !== 0)
                return res.header(200).json({ token: '', message });
            const compare = yield bcrypt_1.default.compare(password, rst[0].password);
            if (!compare)
                return res.header(200).json({ token: '', access: false, message: 'credencial invalida' });
            const token = jsonwebtoken_1.default.sign({ payload: rst[0] }, process.env.API_KEY || 'zzzz-xxx-zzzz', { expiresIn: '3600s' });
            return res.header(200).json({ token, access: true, message: new Date() });
        });
    }
    RefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            const token = jsonwebtoken_1.default.sign({ payload: user }, process.env.API_KEY || 'zzzz-xxx-zzzz', { expiresIn: '3600s' });
            return res.header(200).json({ token, access: true, message: new Date() });
        });
    }
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            try {
                const hashPassword = yield bcrypt_1.default.hash(user.password, 10);
                const newUser = Object.assign(Object.assign({}, user), { password: hashPassword });
                const { rst, message } = yield usuario_data_1.default.Register([newUser]);
                return res.header(200).json({ datos: rst, message, registros: 1 });
            }
            catch (error) {
                return res.header(200).json({ datos: [], message: error.detail, registros: 0 });
            }
        });
    }
    GuardarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paciente } = req.body;
            const { rst, message } = yield usuario_data_1.default.GuardarUsuario(paciente);
            return res.header(200).json({ data: rst, access: true, message });
        });
    }
    DeleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paciente } = req.body;
            const { rst, message } = yield usuario_data_1.default.DeleteUsuario(paciente);
            return res.header(200).json({ data: rst, access: true, message });
        });
    }
    PaginationxUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagina = req.params.pagina;
            const registros = req.params.registros;
            const { rst, message, cantidad_registros } = yield usuario_data_1.default.PaginationxUsuario(parseInt(pagina), parseInt(registros));
            return res.header(200).json({ data: rst, access: true, message, cantidad_registros });
        });
    }
    Specialty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rst, message, size } = yield usuario_data_1.default.Specialty();
            return res.header(200).json({ data: rst, access: true, message, size });
        });
    }
}
const ctrl = new Ctrl();
exports.default = ctrl;
