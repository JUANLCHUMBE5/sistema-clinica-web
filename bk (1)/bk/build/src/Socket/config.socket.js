"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocket = void 0;
const handleSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('usuario connectado');
        socket.on('message', (data) => {
            console.log(data);
            socket.broadcast.emit('message', {
                body: 'saludo',
                from: socket.id.slice(6)
            });
        });
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};
exports.handleSocket = handleSocket;
