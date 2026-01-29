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
const colors_1 = __importDefault(require("colors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
class Database {
    constructor() {
        this.cnn = null;
        dotenv_1.default.config();
        this.Connection();
    }
    static stacticConnection() {
        if (!Database.getConnection) {
            Database.getConnection = new Database();
        }
        return Database.getConnection;
    }
    Connection() {
        this.cnn = new pg_1.Pool({
            host: process.env.BD_HOST || 'localhost',
            port: parseInt(process.env.BD_PORT || '5232'),
            user: process.env.BD_USER || 'admin',
            password: process.env.BD_PSWD || '123456',
            database: process.env.BD_BBDD || 'default',
            idleTimeoutMillis: 10000,
            max: 2000
        });
        if (!this.cnn)
            console.log(colors_1.default.yellow('>server> '), colors_1.default.white('BBDD >'), colors_1.default.red('DOWN'));
        else
            console.log(colors_1.default.yellow('>server> '), colors_1.default.white('BBDD >'), colors_1.default.red('UP'));
    }
    Query(ssql, binds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.cnn.query(ssql, binds);
            return rows;
        });
    }
}
const database = Database.stacticConnection();
exports.default = database;
