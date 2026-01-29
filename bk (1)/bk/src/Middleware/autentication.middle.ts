import { Request, Response , NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { IAuthentication } from "../Models/user.model"
import { isEmailValide } from "../Lib/validation.lib"

export const verificarToken = async(req:Request, res:Response, next:NextFunction):Promise<Response|any>=>{

    const authHeader:any = req.headers['authorization']
    
    if(authHeader === undefined) return res.header(401).json({ datos:[], message:'no autorizado', registros: 0})

    const portadora = authHeader?.split(' ')[0]
    const token =   authHeader?.split(' ')[1] || ''

    if(portadora != process.env.SYS_PORTADORA|| '') return res.header(401).json({ datos:[], message:'no autorizado', registros: 0})


    jwt.verify(token, process.env.API_KEY || '', (err:any)=>{

        if(err)
            return res.header(401).json({ datos:[], message:'no autorizado', registros: 0})
    })

    //console.log(jwt.decode(token)) //informacion el tiempo de vida

    next()
}



export const verificarUser = async(req:Request, res:Response, next:NextFunction):Promise<Response|any>=>{

    
    try{
        const { user } = req.body

        const { email , password }:IAuthentication = user

        if(!user) return res.header(401).json({ token:'', access:false, message:'credencial invalida'})
        if(!email) return res.header(401).json({ token:'', access:false, message:'credencial invalida'})
        if(!password) return res.header(401).json({ token:'', access:false, message:'credencial invalida'})
        if(!isEmailValide(email)) return res.header(401).json({ token:'', access:false, message:'credencial invalida'})

    }catch(error){
        return res.header(401).json({ token:'', access:false, message:'credencial invalida'})
    }


    next()
}


