import React, { useEffect, useState } from 'react'
import { toastConfig, valueDefault } from '../../configs/valueDefault'
import type { IPaciente } from '../../models/user.model'
import usuarioCtrl from '../../controllers/usuario.ctrl'
import type { IHook } from '../../models/Hook.model'
import { useTokenValue } from '../../Providers/token.context'
import { ObtenerFechaInputUTC } from '../../Libs/fecha'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


interface IProps{
    tipoUsuario:string
}


export default function FormPaciente({tipoUsuario}:IProps) {

    const [ paciente, setPaciente ] = useState<IPaciente>(valueDefault.paciente)
    const [ isSaving, setIsSaving ] = useState<boolean>(false)
    
    const [ token , setToken ] = useState<string>(valueDefault.token)
    const tokenValue:IHook = useTokenValue()

    const navigate = useNavigate()

    useEffect(()=>{
    
          const frm = ()=>{
    
          if(!tokenValue.isLoading){
              setToken(tokenValue.datos)
          }
          
          }
    
          frm()
    
      },[tokenValue])
    

    const onChange = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

        if(target.name ==='firstname')
            setPaciente({...paciente, firstname: target.value })

        if(target.name ==='lastname')
            setPaciente({...paciente, lastname: target.value })

        if(target.name ==='date_birth')
            setPaciente({...paciente, date_birth: new Date(target.value) })


         if(target.name ==='email')
            setPaciente({...paciente, email: target.value })


        if(target.name ==='dni')
            setPaciente({...paciente, dni: target.value })

        if(target.name ==='address'){

            let { description } = paciente

            description.address = target.value

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='phone_main'){

            let { description } = paciente

            description.phone_main = target.value

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='phone_alternative'){

            let { description } = paciente

            description.phone_alternative = target.value

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='name_contact'){

            let { description }:any =  paciente 

            let { contact  }:any  = description
            
            contact.name_contact = target.value

            description = { ... description, contact}

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='phone_contact'){

            let { description }:any =  paciente 

            let { contact  }:any  = description
            
            contact.phone_contact = target.value

            description = { ... description, contact}

            setPaciente({...paciente, description })
        
        }
        
        if(target.name ==='name_proxy'){

            let { description }:any =  paciente 

            let { proxy  }:any  = description
            
            proxy.phone_contact = target.value

            description = { ... description, proxy}

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='phone_proxy'){

            let { description }:any =  paciente 

            let { proxy  }:any  = description
            
            proxy.phone_proxy = target.value

            description = { ... description, proxy}

            setPaciente({...paciente, description })
        
        }

    }

    const onChangeTextArea = ({target}:React.ChangeEvent<HTMLTextAreaElement>)=>{

        if(target.name ==='allergy'){

            let { description } = paciente

            description.allergy = target.value

            setPaciente({...paciente, description })
        
        }

    }

    const onChangeSelect  = ({target}:React.ChangeEvent<HTMLSelectElement>)=>{

        if(target.name ==='gender')
            setPaciente({ ...paciente,gender:target.value })

        if(target.name ==='marital_status')
            setPaciente({ ...paciente,marital_status:target.value })

        if(target.name ==='blood_type'){

            let { description } = paciente

            description.blood_type = target.value

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='relation_contact'){

            let { description }:any =  paciente 

            let { contact  }:any  = description
            
            contact.relation_contact = target.value

            description = { ... description, contact}

            setPaciente({...paciente, description })
        
        }

        if(target.name ==='relation_proxy'){

            let { description }:any =  paciente 

            let { proxy  }:any  = description
            
            proxy.relation_proxy = target.value

            description = { ... description, proxy}

            setPaciente({...paciente, description })
        
        }

    }


    const onSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{

        event.preventDefault()


        setIsSaving(true)

        const { datos, mensaje, registros } = await usuarioCtrl.Guardar(token, {...paciente, password:'123456', category_pk1:3})

        if(registros > 1)
            toast.info('Usuario Guardado ', toastConfig.info)


        setPaciente(valueDefault.paciente)

        setIsSaving(false)

        navigate('/main/usuarios/pacientes')

    }

    return (
        <form className="form-container" onSubmit={ onSubmit }>
            {/* Información del Paciente */}
            <div className="section">
                <h2 className="section-title">
                <div className="section-icon">👤</div>
                    Información del {tipoUsuario}
                </h2>

                <div className="form-row-3">
                <div className="form-group">
                    <label>Nombres <span className="required">*</span></label>
                    <input
                            name="firstname"
                            value={paciente.firstname}
                            onChange={onChange}
                            placeholder="Ej: Juan Carlos"
                            required
                    />
                </div>
                <div className="form-group">
                    <label>Apellidos <span className="required">*</span></label>
                    <input
                            name="lastname"
                            value={paciente.lastname}
                            onChange={onChange}
                            placeholder="Ej: Pérez González"
                            required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento <span className="required">*</span></label>
                    <input
                            type="date"
                            name="date_birth"
                            value={ObtenerFechaInputUTC(paciente.date_birth)}
                            onChange={onChange}
                            required
                    />
                    {/*<div className="helper-text">{edad ? `Edad estimada: ${edad} años` : ""}</div>*/}
                </div>
                </div>

                <div className="form-row-3">
                <div className="form-group">
                    <label>Género <span className="required">*</span></label>
                    <select     name="gender" 
                                value={paciente.gender} 
                                onChange={onChangeSelect}
                                required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado Civil <span className="required">*</span></label>
                    <select
                            name="marital_status"
                            value={paciente.marital_status}
                            onChange={onChangeSelect}
                            required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="soltero">Soltero/a</option>
                        <option value="casado">Casado/a</option>
                        <option value="divorciado">Divorciado/a</option>
                        <option value="viudo">Viudo/a</option>
                        <option value="union_libre">Conviviente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Número de Identificación (DNI) <span className="required">*</span></label>
                    <input
                            name="dni"
                            value={paciente.dni}
                            onChange={onChange}
                            maxLength={8}
                            minLength={8}
                            pattern="^[0-9]{8}$"
                            placeholder="8 dígitos"
                    />
                </div>
                </div>
            </div>

            {/* Información de Contacto */}
            <div className="section">
                <h2 className="section-title">
                <div className="section-icon">📞</div>
                    Información de Contacto
                </h2>

                <div className="form-row-3">
                <div className="form-group">
                    <label>Teléfono Principal <span className="required">*</span></label>
                    <input
                            name="phone_main"
                            value={paciente.description.phone_main}
                            onChange={onChange}
                            placeholder="Ej: 987654321"
                            required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono Alternativo</label>
                    <input
                            name="phone_alternative"
                            value={paciente.description.phone_alternative}
                            onChange={onChange}
                            placeholder="Opcional"
                    />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico <span className="required">*</span></label>
                    <input
                            type="email"
                            name="email"
                            value={paciente.email}
                            onChange={onChange}
                            placeholder="ejemplo@correo.com"
                            required
                    />
                </div>
            </div>

            <div className="form-row-1">
                <div className="form-group">
                    <label>Dirección Completa <span className="required">*</span></label>
                    <input
                            name="address"
                            value={paciente.description.address}
                            onChange={onChange}
                            placeholder="Calle, número, referencia…"
                            required
                    />
                </div>
                    
                </div>
                {/*<div className="form-row-3">
                    <div className="form-group">
                        <label>Departamento <span className="required">*</span></label>
                        <input
                        name="ciudad"
                        value={paciente.ciudad}
                        onChange={onChange}
                        placeholder="Ej: Lima"
                        />
                    </div>
                    <div className="form-group">
                        <label>Provincia <span className="required">*</span></label>
                        <input
                        name="ciudad"
                        value={paciente.ciudad}
                        onChange={onChange}
                        placeholder="Ej: Lima"
                        />
                    </div>
                    <div className="form-group">
                        <label>Distrito <span className="required">*</span></label>
                        <input
                        name="ciudad"
                        value={paciente.ciudad}
                        onChange={onChange}
                        placeholder="Ej: Lima"
                        />
                    </div>
                </div>*/}
            </div>


            {/* Información Médica Básica */}
            <div className="section">
                <h2 className="section-title">
                <div className="section-icon">🩺</div>
                    Información Médica Básica
                </h2>

                <div className="form-row-2-medical">
                <div className="form-group">
                    <label>Tipo de Sangre <span className="required">*</span></label>
                    <select
                            name="blood_type"
                            value={paciente.description.blood_type}
                            onChange={onChangeSelect}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Alergias Conocidas</label>
                    <textarea
                            name="allergy"
                            value={paciente.description.allergy}
                            onChange={onChangeTextArea}
                            placeholder="Ej: Penicilina, mariscos, polen…"
                    />
                    <div className="helper-text">
                        Especifique todas las alergias conocidas separadas por comas
                    </div>
                </div>
                </div>
            </div>

            {/* Contacto de Emergencia */}
            <div className="section">
                <h2 className="section-title">
                <div className="section-icon">🚨</div>
                Contacto de Emergencia
                </h2>

                <div className="form-row-3">
                <div className="form-group">
                    <label>Nombre Completo </label>
                    <input
                        name="name_contact"
                        value={paciente.description.contact.name_contact}
                        onChange={onChange}
                        placeholder="Ej: María Pérez González"
                    />
                </div>
                <div className="form-group">
                    <label>Relación </label>
                    <select
                    name="relation_contact"
                    value={paciente.description.contact.relation_contact}
                    onChange={onChangeSelect}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="padre">Padre</option>
                        <option value="madre">Madre</option>
                        <option value="esposo">Esposo/a</option>
                        <option value="hijo">Hijo/a</option>
                        <option value="hermano">Hermano/a</option>
                        <option value="otro_familiar">Otro Familiar</option>
                        <option value="amigo">Amigo/a</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Teléfono </label>
                    <input
                    name="phone_contact"
                    value={paciente.description.contact.phone_contact}
                    onChange={onChange}
                    placeholder="Ej: 987654321"
                    />
                </div>
                </div>
            </div>

            {/* Acompañante */}
            <div className="section">
                <h2 className="section-title">
                <div className="section-icon">🚨</div>
                Acompañante o Apoderado
                </h2>

                <div className="form-row-3">
                    <div className="form-group">
                        <label>Nombre Completo </label>
                        <input
                                name="name_proxy"
                                value={paciente.description.proxy.name_proxy}
                                onChange={onChange}
                                placeholder="Ej: María Pérez González"
                        />
                    </div>
                    <div className="form-group">
                        <label>Relación </label>
                        <select
                                name="relation_proxy"
                                value={paciente.description.proxy.relation_proxy}
                                onChange={onChangeSelect}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="padre">Padre</option>
                            <option value="madre">Madre</option>
                            <option value="esposo">Esposo/a</option>
                            <option value="hijo">Hijo/a</option>
                            <option value="hermano">Hermano/a</option>
                            <option value="otro_familiar">Otro Familiar</option>
                            <option value="amigo">Amigo/a</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Teléfono </label>
                        <input
                                name="phone_proxy"
                                value={paciente.description.proxy.phone_proxy}
                                onChange={onChange}
                                placeholder="Ej: 987654321"
                        />
                    </div>
                </div>
            </div>

            <div className="note">Los campos marcados con * son obligatorios</div>

            {/* Acciones */}
            <div className="form-actions">
                <button type="button" className="btn btn-cancel" onClick={()=> null/*cancelar*/}>
                ✕ Cancelar
                </button>
                <button className={`btn btn-primary ${isSaving ? "loading" : ""}`} disabled={isSaving}>
                💾 {isSaving ? "Guardando..." : "Guardar Paciente"}
                </button>
            </div>
        </form>
    )
}
