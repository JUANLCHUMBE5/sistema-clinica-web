import { Request, Response } from "express"
import { IUser } from "../Models/user.model"
import data from "../Data/index.data"
import db from '../Connections/postgres.connection'

class Ctrl{

    async Index(req:Request, res:Response ):Promise<any|Response>
    { 
        return res.status(200).json({ saludo:'hola mundo'})
    }

    async Users(req:Request, res:Response ):Promise<any|Response>
    { 

        const rst = await db.Query('select * from users.users', [])
       
        return res.status(200).json({ saludo:'lista de usuarios'})
    }

    async UsersxId(req:Request, res:Response ):Promise<any|Response>
    { 
       /*
        const pk1:string = req.params.id

        const { datos:usuarios , message}:any = await data.Users()

     
        if(!usuarios) return null
        
        const usuario = usuarios.find((user:IUser) => user.id  === parseInt(pk1) )

*/
       
        return res.status(200).json({ usuario:[]})
    }

    async Create(req:Request, res:Response ):Promise<any|Response>
    { 

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
       
        return res.status(200).json({ usuarios : []})
    }

}

const ctrl = new Ctrl()
export default ctrl