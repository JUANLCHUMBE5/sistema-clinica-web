import { valueDefault } from "../configs/valueDefault"
import type { IHook } from "../models/Hook.model"

export const TypeUsuario ={
    listar:'listar',
    guardar:'guardar',
}

export const initialUsuario:IHook = {
    isLoading: true,
    datos: valueDefault.user,
    error:''
}

export const UsuarioHook = (state:IHook =initialUsuario, action:any )=>{

    switch(action.type){
        case 'listar':
            return state
        case 'guardar':
            return {
                isLoading: false,
                datos: action.payload,
                error:''
            }
        default:
            return state
    }

}