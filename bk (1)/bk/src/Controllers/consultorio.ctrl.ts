import { Request, Response } from 'express'
import data from '../Data/consultorio.data'


class Ctrl{

    async Edificios(req:Request, res:Response):Promise<Response|any>{

        const { rst, message } = await data.Edificios()

        return res.header(200).json({ datos:rst, message, registros: rst.length})
        

    }

    
    async InsertEdificios(req:Request, res:Response):Promise<Response|any>{

        const { consultorio } = req.body

        const { rst, message } = await data.InsertEdificios([consultorio])

        return res.header(200).json({ datos:rst, message, registros: rst.length}) 
        

    }

    
    async Consultorios(req:Request, res:Response):Promise<Response|any>{

        const { codigo, especialidad, piso } = req.body

        
        const { rst, message } = await  data.ejecutar(
                                            data.FiltroxOrdenar(
                                                data.FiltroxPiso(
                                                    data.FiltroxCodigo(
                                                        data.FiltroxEspecialidad(
                                                            data.Consultorios(), especialidad), codigo),piso)))

        return res.header(200).json({ datos:rst, message, registros: rst.length}) 
        

    }
}

const ctrl = new Ctrl()
export default ctrl