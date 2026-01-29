import { axioAPI } from "../apis/axio.api"
import { _ApiRutas_ } from "../configs/api.config"
import type { IConsultorio } from "../models/consultorio.model"


class Ctrl {

    async Edificios(token:string){

        const { data } = await axioAPI({
            method:'get',
            url: _ApiRutas_.Consultorio + '/edificios',
            headers:{
            
                authorization:'Bearer ' + token
            }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }

    async Register(token:string, consultorio:IConsultorio){

        const { data } = await axioAPI({
            method:'put',
            url: _ApiRutas_.Consultorio + '/register',
            headers:{
            
                authorization:'Bearer ' + token
            },
            data:{
                consultorio
            }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }

    async Listar(token:string, {codigo , piso,  especialidad}: any){

        const { data } = await axioAPI({
            method:'post',
            url: _ApiRutas_.Consultorio + '/consultorios', 
            headers:{
            
                authorization:'Bearer ' + token
            },
            data:{
                codigo,
                especialidad,
                piso
            }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }
}

const consultorioCtrl = new Ctrl()
export default consultorioCtrl