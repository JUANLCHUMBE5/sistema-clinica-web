import { createContext, useContext } from "react"
import { initialUsuario } from "../Hooks/usuario.hook"


const  updateValores = ()=> null

export const UsuarioContext = createContext<any>([ initialUsuario , updateValores ])

const useUsuarioValue = ()=> useContext(UsuarioContext)[0]
const useUsuarioDispatch = ()=> useContext(UsuarioContext)[1]

export { useUsuarioValue, useUsuarioDispatch }
