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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const cita_route_1 = __importDefault(require("./Routes/cita.route"));
const index_route_1 = __importDefault(require("./Routes/index.route"));
const usuario_route_1 = __importDefault(require("./Routes/usuario.route"));
const consultorio_route_1 = __importDefault(require("./Routes/consultorio.route"));
const socket_io_1 = require("socket.io");
const config_socket_1 = require("./Socket/config.socket");
class Server {
    constructor() {
        this.io = null;
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.config();
        this.middleware();
        this.rutas();
        this.Socket();
    }
    config() {
        dotenv_1.default.config({ path: `.env`, override: true, quiet: true });
        this.app.set('port', process.env.SYS_PORT || 4000);
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: '*',
            methods: "GET, POST, PUT, PATCH, DELETE",
            allowedHeaders: ['Content-Type', 'Authorization'],
            // "'Access-Control-Allow-Headers','X-Requested-With,content-type,authorization'",
            credentials: true
        }));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.listen(this.app.get('port'), () => {
                console.log(colors_1.default.yellow('>server> '), colors_1.default.white('STATUS >'), colors_1.default.green('UP'));
                console.log(colors_1.default.yellow('>server> '), colors_1.default.white('PUERTO >'), colors_1.default.green(this.app.get('port')));
            });
        });
    }
    Socket() {
        const io = new socket_io_1.Server(this.server, {
            cors: {
                origin: process.env.API_IO_SERVER + ':' + process.env.API_IO_PORT
            }
        });
        if (!io)
            console.log(colors_1.default.yellow('>server> '), colors_1.default.white('SOCKET >'), colors_1.default.red('DOWN'));
        else
            console.log(colors_1.default.yellow('>server> '), colors_1.default.white('SOCKET >'), colors_1.default.red('UP'));
        (0, config_socket_1.handleSocket)(io);
    }
    rutas() {
        this.app.use('/', index_route_1.default);
        this.app.use('/api/usuario', usuario_route_1.default);
        this.app.use('/api/consultorio', consultorio_route_1.default);
        this.app.use("/api/cita", cita_route_1.default);
    }
}
const server = new Server();
server.start();
