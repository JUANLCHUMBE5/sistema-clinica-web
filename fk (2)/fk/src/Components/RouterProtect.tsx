import React, { Fragment, useEffect, useMemo, useState, type JSX } from 'react'
import type { IHook } from '../models/Hook.model'
import { useTokenDispatch, useTokenValue } from '../Providers/token.context'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import usuarioCtrl from '../controllers/usuario.ctrl'
import { TypeToken } from '../Hooks/token.hook'

interface IProps{
    children:JSX.Element| JSX.Element[]
}

export default function RouterProtect({children}:IProps):React.ReactElement {

    const tokenValue:IHook = useTokenValue()
    const [ token, setToken ] = useState<string>('')

    const [count, setCount] = useState(0)
    const tokenDispatch = useTokenDispatch()

    useMemo(()=>{

        const frm = ()=>{

            if(!tokenValue.isLoading){
                setToken(tokenValue.datos)
            }
        }

        frm()

    },[tokenValue])

    useEffect(()=>{

        const frm = async()=>{

            if(token==='') return

            const decode = jwtDecode(token)
            const { payload, iat, exp }:any = decode


            if(exp === iat + count - (1000 * 60 * 1)){  //tiempo de segundo * segundos * minutos
                const { token:newToken } = await usuarioCtrl.RefreshToken(token, payload)
                
                tokenDispatch({ type: TypeToken.guardar, payload: newToken})
                setCount(0)
            }

        }

        frm() 

    },[token, count])


    useEffect(() => {
    
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1)
            
        }, 1000); 

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [])


    
    return (
        <Fragment>
            { 
                token!=='' ?
                    children 
                :
                    <Navigate to={'/'} />
            }
        </Fragment>
    )
    

    
}
