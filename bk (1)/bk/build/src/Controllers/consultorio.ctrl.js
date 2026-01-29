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
const consultorio_data_1 = __importDefault(require("../Data/consultorio.data"));
class Ctrl {
    Edificios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rst, message } = yield consultorio_data_1.default.Edificios();
            return res.header(200).json({ datos: rst, message, registros: rst.length });
        });
    }
    InsertEdificios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { consultorio } = req.body;
            const { rst, message } = yield consultorio_data_1.default.InsertEdificios([consultorio]);
            return res.header(200).json({ datos: rst, message, registros: rst.length });
        });
    }
    Consultorios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo, especialidad, piso } = req.body;
            const { rst, message } = yield consultorio_data_1.default.ejecutar(consultorio_data_1.default.FiltroxOrdenar(consultorio_data_1.default.FiltroxPiso(consultorio_data_1.default.FiltroxCodigo(consultorio_data_1.default.FiltroxEspecialidad(consultorio_data_1.default.Consultorios(), especialidad), codigo), piso)));
            return res.header(200).json({ datos: rst, message, registros: rst.length });
        });
    }
}
const ctrl = new Ctrl();
exports.default = ctrl;
