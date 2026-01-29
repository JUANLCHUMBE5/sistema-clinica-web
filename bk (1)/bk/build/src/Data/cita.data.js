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
const postgres_connection_1 = __importDefault(require("../Connections/postgres.connection"));
class CitaData {
    PorPaciente(patient_pk1) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `
        select c.*
        from clinica.citas c
        where c.patient_pk1 = $1
        order by c.start_time desc
      `;
                const rst = yield postgres_connection_1.default.Query(ssql, [patient_pk1]);
                return { rst, message: "" };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    Guardar(cita) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                if (cita.pk1 && cita.pk1 > 0) {
                    // UPDATE
                    const ssql = `
          update clinica.citas
          set patient_pk1 = $1,
              doctor_pk1  = $2,
              start_time  = $3,
              end_time    = $4,
              status      = $5,
              notes       = $6
          where pk1 = $7
          returning *;
        `;
                    const params = [
                        cita.patient_pk1,
                        cita.doctor_pk1,
                        cita.start_time,
                        (_a = cita.end_time) !== null && _a !== void 0 ? _a : null,
                        cita.status,
                        (_b = cita.notes) !== null && _b !== void 0 ? _b : null,
                        cita.pk1,
                    ];
                    const rst = yield postgres_connection_1.default.Query(ssql, params);
                    return { rst, message: "" };
                }
                else {
                    // INSERT
                    const ssql = `
          insert into clinica.citas
            (patient_pk1, doctor_pk1, start_time, end_time, status, notes)
          values
            ($1, $2, $3, $4, $5, $6)
          returning *;
        `;
                    const params = [
                        cita.patient_pk1,
                        cita.doctor_pk1,
                        cita.start_time,
                        (_c = cita.end_time) !== null && _c !== void 0 ? _c : null,
                        cita.status,
                        (_d = cita.notes) !== null && _d !== void 0 ? _d : null,
                    ];
                    const rst = yield postgres_connection_1.default.Query(ssql, params);
                    return { rst, message: "" };
                }
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
}
const data = new CitaData();
exports.default = data;
