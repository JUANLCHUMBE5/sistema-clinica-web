import { valueDefault } from "../configs/valueDefault"
import type { IHook } from "../models/Hook.model"

export const TypeToken ={
    listar:'listar',
    guardar:'guardar',
}

export const initialToken:IHook = {
    isLoading: true,
    datos: valueDefault.token,
    error:''
}

export const TokenHook = (state:IHook =initialToken, action:any )=>{

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