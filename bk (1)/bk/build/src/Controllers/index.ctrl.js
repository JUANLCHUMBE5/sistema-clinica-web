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
class Ctrl {
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ saludo: 'hola mundo' });
        });
    }
    Users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rst = yield postgres_connection_1.default.Query('select * from users.users', []);
            return res.status(200).json({ saludo: 'lista de usuarios' });
        });
    }
    UsersxId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
             const pk1:string = req.params.id
     
             const { datos:usuarios , message}:any = await data.Users()
     
          
             if(!usuarios) return null
             
             const usuario = usuarios.find((user:IUser) => user.id  === parseInt(pk1) )
     
     */
            return res.status(200).json({ usuario: [] });
        });
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const { user } = req.body
     
              const usuarios:IUser[] = [
                 {
                     id:1,
                     nombre:'cabana'
                 },
                 {
                     id:2,
                     nombre:'mendoza'
                 }
             ]
     
             const newUsuarios = usuarios.push(user)
     */
            return res.status(200).json({ usuarios: [] });
        });
    }
}
const ctrl = new Ctrl();
exports.default = ctrl;
