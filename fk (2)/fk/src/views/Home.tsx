import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import usuarioCtrl from '../controllers/usuario.ctrl'
import { toast, ToastContainer } from 'react-toastify'
//import io from 'socket.io-client'
import { useTokenDispatch } from '../Providers/token.context'
import { TypeToken } from '../Hooks/token.hook'


//const socket = io()


export default function Home() {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const navigate = useNavigate()
    const tokenDispatch = useTokenDispatch()

    const handleInput = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

        if(target.name ==='email')
            setEmail(target.value)

        if(target.name === 'password')
            setPassword(target.value)

    }

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{

        event.preventDefault()

        setIsLoading(true)
        
        const { token, acceso,  mensaje } = await usuarioCtrl.signIn(email, password)

        setIsLoading(false) 
        
        if(acceso){
            //socket.emit('message','usuario conectado al sistema')  //aviso al servidor la conexion
            tokenDispatch({type: TypeToken.guardar, payload: token}) //guardo el token para todo el sistema
            navigate('/main')
        }
        
    }

    return (
        <Fragment>
            <ToastContainer />
            

            <div className='contenido' >
                <div className="row">
                    <div className="col-xl-9 col-lg-9 col-md-6 col-sm-12">
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <div className="card">
                            <div className="card-header bg-primary text-white fs-bold">
                                <div className="card-title">
                                    Bienvenido al sistema 
                                </div>
                            </div>
                            <form onSubmit={ handleSubmit }>
                                <div className="card-body">

                                    <div>
                                        Por favor validar sus credenciales
                                        <hr />
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">
                                                <i className="fa-solid fa-envelope"></i>
                                            </span>
                                            <input  type="text" 
                                                    className="form-control" 
                                                    name='email'
                                                    onChange={ handleInput }
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">
                                                <i className="fa-solid fa-key"></i>
                                            </span>
                                            <input  type="password" 
                                                    className="form-control" 
                                                    name='password'
                                                    autoComplete=''
                                                    onChange={ handleInput } 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button className='btn btn-outline-primary'
                                            type='submit'
                                            disabled={isLoading}
                                    >
                                        ingresar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            
            


           
            
        </Fragment>
    )
}
