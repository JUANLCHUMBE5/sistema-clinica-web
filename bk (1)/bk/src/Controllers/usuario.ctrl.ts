import { Request, Response } from 'express'
import data from '../Data/usuario.data'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IAuthentication, IUser } from '../Models/user.model'



class Ctrl{

    async All(req:Request, res:Response):Promise<Response|any>{

        const { rst, message } = await data.All()

        return res.header(200).json({ datos:rst, message, registros: rst.length})
        

    }

    
    async FiltroxUsuario(req:Request, res:Response):Promise<Response|any>{

        
        const { dni, apellidos, category_pk1 } = req.body

        const { rst, message } = await  data.EjecutaSql(
                                            data.FilterxUsuarioxApellido(
                                                data.FiltroxUsuarioxDni(
                                                    data.FiltroxUsuarioxCategoria(
                                                        data.FiltroxUsuario(), category_pk1), dni), apellidos))

        return res.header(200).json({ datos:rst, message, registros: rst.length})


    }






    /**TOKEN**/

    async GeneratorToken(req:Request, res:Response):Promise<Response|any>{

        const { user }  = req.body

        const { email, password }:IAuthentication = user
        const { rst, message } = await data.FindxEmail(email)

        if(rst.length !== 1) return res.header(200).json({ token:'', access:false, message:'credencial invalida'})
        if(rst.length === 0 && message.length === 0) return res.header(200).json({ token:'', message:'credencial invalida'}) 
        if(rst.length === 0 && message.length !== 0) return res.header(200).json({ token:'', message })     


        const compare:boolean = await bcrypt.compare( password, rst[0].password)

        if(!compare) return res.header(200).json({ token:'', access:false,  message:'credencial invalida'})

        const token = jwt.sign({ payload: rst[0]}, process.env.API_KEY || 'zzzz-xxx-zzzz', {expiresIn:'3600s'})

        
        return res.header(200).json({ token, access:true, message:new Date()})

    }

    async RefreshToken(req:Request, res:Response):Promise<Response|any>{

        const { user } = req.body
        
        const token = jwt.sign({ payload: user}, process.env.API_KEY || 'zzzz-xxx-zzzz', {expiresIn:'3600s'})

        
        return res.header(200).json({ token, access:true, message:new Date()})

    }

    async Register(req:Request, res:Response):Promise<Response|any>{

        const { user } = req.body
        
        try{

            const hashPassword = await bcrypt.hash(user.password, 10)

            const newUser:IUser = {...user, password:hashPassword}
 

            const { rst, message  }= await data.Register([newUser])

            return res.header(200).json({ datos:rst, message, registros: 1})


        }catch(error:any){
            return res.header(200).json({ datos:[], message:error.detail, registros: 0})
        }

    }


    async GuardarUsuario(req:Request, res:Response):Promise<Response|any>{

        const { paciente } = req.body
        
        const { rst, message } = await data.GuardarUsuario(paciente)

        
        return res.header(200).json({ data: rst, access:true, message})

    }
    async DeleteUsuario(req:Request, res:Response):Promise<Response|any>{

        const { paciente } = req.body
        
        const { rst, message } = await data.DeleteUsuario(paciente)

        
        return res.header(200).json({ data: rst, access:true, message})

    }

    async PaginationxUsuario(req:Request, res:Response):Promise<Response|any>{

        const pagina = req.params.pagina
        const registros = req.params.registros
        
        const { rst, message, cantidad_registros } = await data.PaginationxUsuario(parseInt(pagina), parseInt(registros))

        
        return res.header(200).json({ data: rst, access:true, message, cantidad_registros})

    }

    
    async Specialty(req:Request, res:Response):Promise<Response|any>{

        const { rst, message, size } = await data.Specialty()

        
        return res.header(200).json({ data: rst, access:true, message, size})

    }


}

const ctrl = new Ctrl()
export default ctrl