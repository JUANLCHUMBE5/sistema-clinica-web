import React from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import '../../styles/Registropaciente.css'
import FormPaciente from './FormPaciente'
import FormDoctor from './FormDoctor'



export default function Registro():React.ReactElement {

  const params = useParams()
  const tipoUsuario = params.tipoUsuario ?? ''

 
  return (
    <div className="pn-wrap">
      <ToastContainer />

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className='text-capitalize'>registro de nuevo {tipoUsuario} </h1>
          <p>Complete la información del {tipoUsuario} para crear su expediente médico</p>
        </div>

        {
          tipoUsuario ==='paciente' ?
            <FormPaciente tipoUsuario ={tipoUsuario} />

          :

            <FormDoctor tipoUsuario ={tipoUsuario} />
        }
       
      </div>
    </div>
  )
}
