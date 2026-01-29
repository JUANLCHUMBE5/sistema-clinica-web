import { useEffect, useState } from "react"
import { valueDefault } from "../configs/valueDefault"
import type { IHook } from "../models/Hook.model"
import { useTokenValue } from "../Providers/token.context"


export default function Principal() {

  const [ token , setToken ] = useState<string>(valueDefault.token)
  const tokenValue:IHook = useTokenValue()

  const [ isLoading , setIsLoading ] = useState<boolean>(false)

  useEffect(()=>{

    const frm = ()=>{

      if(!tokenValue.isLoading){
        setToken(tokenValue.datos)
      }
      
    }

    frm()

  },[tokenValue])



  return (
    <div>
        
    </div>
  )
}
