import { useReducer, type JSX } from "react";
import { initialUsuario, UsuarioHook } from "../Hooks/usuario.hook";
import { UsuarioContext } from "./usuario.context";


interface IProps{
    children:JSX.Element| JSX.Element[]
}

export default function UsuarioProvider({children}:IProps){

    const [ store, dispatch ] = useReducer( UsuarioHook, initialUsuario )

    return(
        <UsuarioContext.Provider value={[store, dispatch]}>
            { children }
        </UsuarioContext.Provider>
    )

}