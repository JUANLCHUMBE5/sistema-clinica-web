import { useReducer, type JSX } from "react";
import { initialToken, TokenHook } from "../Hooks/token.hook";
import { TokenContext } from "./token.context";


interface IProps{
    children:JSX.Element| JSX.Element[]
}

export default function TokenProvider({children}:IProps){

    const [ store, dispatch ] = useReducer( TokenHook, initialToken )

    return(
        <TokenContext.Provider value={[store, dispatch]}>
            { children }
        </TokenContext.Provider>
    )

}