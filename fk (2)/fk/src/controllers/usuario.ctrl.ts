import { axioAPI } from "../apis/axio.api"
import { _ApiRutas_ } from "../configs/api.config"
import type { IPaciente, IUser } from "../models/user.model"


class Ctrl {

    async all(token:string){

        const { data } = await axioAPI({
            method:'get',
            url: _ApiRutas_.Usuario + '/all',
            headers:{
            
                authorization:'Bearer ' + token
            }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }

    
    async FiltroxUsuario(token:string,{ category_pk1, dni, apellidos }:any){

        const { data } = await axioAPI({
            method:'POST',
            url: _ApiRutas_.Usuario + '/filtro/usuario',
            headers:{
                Authorization:'Bearer ' + token
            },
           data:{
                dni, apellidos, category_pk1
           }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }
/*
    get -> busqueda url
    post -> busqueda x conjuntas

    put -> insert
    patch -> actualizar
    delete -> borrar
}*/
    async Guardar(token:string, paciente:any){

        const { data } = await axioAPI({
            method:'put',
            url: _ApiRutas_.Usuario + '/insert',
            headers:{
                Authorization:'Bearer ' + token
            },
           data:{
                user:paciente
           }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }

    async Delete(token:string, paciente:any){

        const { data } = await axioAPI({
            method:'delete',
            url: _ApiRutas_.Usuario + '/delete/usuario',
            headers:{
                Authorization:'Bearer ' + token
            },
           data:{
                paciente
           }
        })

        return { datos: data.datos, mensaje: data.message, registros: data.registros}

    }




    /** */

    async signIn(email:string, password:string){

        const { data } = await axioAPI({
            method:'post',
            url: _ApiRutas_.Usuario + '/token',
            data:{
                user:{
                    email,
                    password
                }
            }
            
        })

        return { token: data.token, acceso: data.access, mensaje: data.message}

    }

    async RefreshToken(token:string, user:IUser){

        const { data } = await axioAPI({
            method:'post',
            url: _ApiRutas_.Usuario + '/refresh/token',
            headers:{
                Authorization:'Bearer ' + token
            },
            data:{
                user
            }
            
        })

        return { token: data.token, acceso: data.access, mensaje: data.message}

    }
    

    async Especialidades(token:string){

        const { data } = await axioAPI({
            method:'get',
            url: _ApiRutas_.Usuario + '/specialty',
            headers:{
                Authorization:'Bearer ' + token
            },
           
        })

        return { datos: data.data, mensaje: data.message, registros: data.size}

    }



}

const usuarioCtrl = new Ctrl()
export default usuarioCtrl