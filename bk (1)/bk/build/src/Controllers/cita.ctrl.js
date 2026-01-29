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
const cita_data_1 = __importDefault(require("../Data/cita.data"));
class CitaCtrl {
    // listar citas por paciente
    PorPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patient_pk1 } = req.body;
            const { rst, message } = yield cita_data_1.default.PorPaciente(Number(patient_pk1));
            return res
                .status(200)
                .json({ datos: rst, message, registros: rst.length });
        });
    }
    // insertar / actualizar cita
    Guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cita } = req.body;
            const { rst, message } = yield cita_data_1.default.Guardar(cita);
            return res
                .status(200)
                .json({ datos: rst, message, registros: rst.length });
        });
    }
}
const ctrl = new CitaCtrl();
exports.default = ctrl;
