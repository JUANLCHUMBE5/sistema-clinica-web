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
    All() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = 'select * from users.users';
                const rst = yield postgres_connection_1.default.Query(ssql, []);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    FindxEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = 'select * from users.users where email=$1';
                const rst = yield postgres_connection_1.default.Query(ssql, [email]);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    Register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `insert into users.users( email, password, firstname, lastname, category_pk1, date_birth, gender, marital_status, dni, description) 
                 select * from json_populate_recordset(null::record, $1) as (
                    email            text, 
                    password         text,
                    firstname        text, 
                    lastname         text, 
                    category_pk1     int,  
                    date_birth       timestamp,
                    gender           text,
                    marital_status   text,
                    dni              text,
                    description      json
                 )
                returning pk1

                `;
                const rst = yield postgres_connection_1.default.Query(ssql, [JSON.stringify(user)]);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    /** Busqueda por filtro */
    FiltroxUsuario() {
        return `
                        select * 
                        from users.users 
                        where
                            pk1 > 0 

                        `;
    }
    FiltroxUsuarioxCategoria(ssql, category_pk1) {
        if (category_pk1 === undefined)
            return ssql;
        const sql = ssql + `
                and category_pk1=${category_pk1}
        `;
        return sql;
    }
    FiltroxUsuarioxDni(ssql, dni) {
        if (dni === undefined)
            return ssql;
        const sql = ssql + `
                and dni='${dni}'
        `;
        return sql;
    }
    FilterxUsuarioxApellido(ssql, apellidos) {
        if (apellidos === undefined)
            return ssql;
        const sql = ssql + `
                and lastname ilike '%${apellidos}%'
        `;
        return sql;
    }
    EjecutaSql(ssql) {
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
    GuardarUsuario(paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `
                    update users.users set 
                            lastname = $1,
                            firstname = $2,
                            email= '${paciente.email}'
                    where
                        pk1 = ${paciente.pk1}


            `;
                const rst = yield postgres_connection_1.default.Query(ssql, [paciente.lastname, paciente.firstname]);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    DeleteUsuario(paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `
                    update users.users set status= false
                    where
                        pk1 = $1


            `;
                const rst = yield postgres_connection_1.default.Query(ssql, [paciente.pk1]);
                return { rst, message: '' };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error };
            }
        });
    }
    PaginationxUsuario(pagina, registros) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `
                    select count(*) cant_usuarios
                    from users.users 
                    
            `;
                const rest = yield postgres_connection_1.default.Query(ssql, []);
                const cantidad_registros = rest[0].cant_usuarios;
                const sql = `select *
                            from users.users 
                            limit $1 offset ($2 - 1) * $1  + 1  
                        `;
                const rst = yield postgres_connection_1.default.Query(sql, [registros, pagina]);
                return { rst, message: '', cantidad_registros };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error, cantidad_registros: 0 };
            }
        });
    }
    Specialty() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ssql = `
                    select *
                    from users.specialties 
                    where
                        status
                    
            `;
                const rst = yield postgres_connection_1.default.Query(ssql, []);
                return { rst, message: '', size: rst.length };
            }
            catch (error) {
                console.log(error);
                return { rst: [], message: error, size: 0 };
            }
        });
    }
}
const data = new Data();
exports.default = data;
