import { createContext, useContext } from "react"
import { initialToken } from "../Hooks/token.hook"


const  updateValores = ()=> null

export const TokenContext = createContext<any>([ initialToken , updateValores ])

const useTokenValue = ()=> useContext(TokenContext)[0]
const useTokenDispatch = ()=> useContext(TokenContext)[1]

export { useTokenValue, useTokenDispatch }
