import express from 'express'
import http from 'http'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import dotenv from 'dotenv'
import colors from 'colors'

import citaRoute from "./Routes/cita.route";

import indexRoute  from './Routes/index.route'
import usuarioRoute from './Routes/usuario.route'
import consultorioRoute from './Routes/consultorio.route'

import { DefaultEventsMap, Server as SocketServer } from 'socket.io'
import { handleSocket } from './Socket/config.socket'


class Server{

    app:express.Application
    server:http.Server
    io: SocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>|null = null


    constructor(){

        this.app = express()
        this.server = http.createServer(this.app)

        this.config()

        this.middleware() 
        this.rutas()
        this.Socket()
        
    }

    config(){

        dotenv.config({path: `.env`, override: true , quiet: true })

        this.app.set('port', process.env.SYS_PORT || 4000 )
    }


    middleware(){

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false}))
        
        this.app.use(compression())
        this.app.use(helmet())

        this.app.use(cors({
            origin:'*',
            methods: "GET, POST, PUT, PATCH, DELETE",
            allowedHeaders:  ['Content-Type', 'Authorization'] , 
            // "'Access-Control-Allow-Headers','X-Requested-With,content-type,authorization'",
            credentials:true
        }))
    }

    async start(){

        await this.server.listen(this.app.get('port'), ()=>{
            console.log(colors.yellow('>server> '), colors.white('STATUS >'), colors.green('UP'))
            console.log(colors.yellow('>server> '), colors.white('PUERTO >'), colors.green(this.app.get('port')))
        })

    }
    
    Socket(){

       
        const io = new SocketServer(this.server,{
            cors:{
                origin: process.env.API_IO_SERVER+':'+process.env.API_IO_PORT
            }
        })

        if(!io)
            console.log(colors.yellow('>server> '), colors.white('SOCKET >'), colors.red('DOWN'))
        else
            console.log(colors.yellow('>server> '), colors.white('SOCKET >'), colors.red('UP'))

        handleSocket(io)
    }

    rutas(){

        this.app.use('/' , indexRoute )
        this.app.use('/api/usuario', usuarioRoute)

        this.app.use('/api/consultorio', consultorioRoute)

        this.app.use("/api/cita", citaRoute);

    }

}


const server = new Server()
server.start()