import { DefaultEventsMap, Server as SocketServer } from "socket.io"

export const handleSocket = (io:SocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>{

    io.on('connection', (socket:any)=>{
        console.log('usuario connectado')

        socket.on('message', (data:any)=>{
            console.log(data)

            socket.broadcast.emit('message' , {
                body:'saludo',
                from:socket.id.slice(6)
            })
        }) 

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        })
         
    })  

}