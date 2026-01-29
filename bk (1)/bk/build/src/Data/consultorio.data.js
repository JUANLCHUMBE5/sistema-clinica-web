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
class Data {
    Edificios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = 'select * from consultorios.buildings where active';
                const rst = yield postgres_connection_1.default.Query(ssql, []);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    InsertEdificios(consultorio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `insert into consultorios.offices(building_pk1, door, floor, specialite_pk1, aforo ) 
                 select * from json_populate_recordset(null::record, $1) as (
                    building_pk1            int, 
                    door                    text,
                    floor                   text, 
                    specialite_pk1          int, 
                    aforo                   text
                 )
                returning pk1

                `;
                const rst = yield postgres_connection_1.default.Query(ssql, [JSON.stringify(consultorio)]);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    Consultorios() {
        return `
                select
                    s.siglas||'-'||b.sigla||'-'||o.floor||o.door codigo ,
                    b.sigla,
                    s.siglas||' - '||s.name especialidad,
                    o.*
                from consultorios.offices o
                inner join consultorios.buildings b on o.building_pk1 = b.pk1
                inner join users.specialties s on o.specialite_pk1 = s.pk1
                where 
                    o.pk1<>0
        
       
       `;
    }
    FiltroxEspecialidad(ssql, specialite_pk1) {
        if (specialite_pk1 === 0 || specialite_pk1 === undefined)
            return ssql;
        return ssql + `
                   and s.pk1 = ${specialite_pk1}
                `;
    }
    FiltroxCodigo(ssql, codigo) {
        if (codigo === '' || codigo === undefined)
            return ssql;
        return ssql + `
                    and s.siglas||'-'||b.sigla||'-'||o.floor||o.door ilike ${codigo}%
                `;
    }
    FiltroxPiso(ssql, piso) {
        if (piso === '' || piso === undefined)
            return ssql;
        return ssql + `
                    and o.floor = '${piso}'
                `;
    }
    FiltroxOrdenar(ssql) {
        return ssql + `  
                        order by
                        especialidad, b.sigla, o.floor, o.door
                        `;
    }
    ejecutar(ssql) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rst = yield postgres_connection_1.default.Query(ssql, []);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
}
const data = new Data();
exports.default = data;
