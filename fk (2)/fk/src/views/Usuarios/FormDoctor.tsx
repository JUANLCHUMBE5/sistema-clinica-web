import React, { useEffect, useState } from 'react'
import { toastConfig, valueDefault } from '../../configs/valueDefault'
import type { IDoctor, IEspecialidad } from '../../models/user.model'
import usuarioCtrl from '../../controllers/usuario.ctrl'
import type { IHook } from '../../models/Hook.model'
import { useTokenValue } from '../../Providers/token.context'
import { ObtenerFechaInputUTC } from '../../Libs/fecha'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


interface IProps{
    tipoUsuario:string
}


export default function FormDoctor({tipoUsuario}:IProps) {

    const [ doctor, setDoctor ] = useState<IDoctor>(valueDefault.doctor)
    const [ isSaving, setIsSaving ] = useState<boolean>(false)
    
    const [ token , setToken ] = useState<string>(valueDefault.token)
    const tokenValue:IHook = useTokenValue()

    const [ especialidades, setEspcialidades ] = useState<IEspecialidad[]>()
    const navigate = useNavigate()

    useEffect(()=>{
    
          const frm = ()=>{
    
          if(!tokenValue.isLoading){
              setToken(tokenValue.datos)
          }
          
          }
    
          frm()
    
      },[tokenValue])

      useEffect(()=>{

        const frm = async()=>{

            if(token === '') return

            const {datos, mensaje, registros} = await usuarioCtrl.Especialidades(token)
            
            if(registros === 0 ){ 
                toast.info('error> ' + mensaje, toastConfig.info)
                return
            }

            setEspcialidades(datos)


        }

        frm()


      },[token])
    

    const onChange = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

        if(target.name ==='firstname')
            setDoctor({...doctor, firstname: target.value })

        if(target.name ==='lastname')
            setDoctor({...doctor, lastname: target.value })

        if(target.name ==='date_birth')
            setDoctor({...doctor, date_birth: new Date(target.value) })


         if(target.name ==='email')
            setDoctor({...doctor, email: target.value })


        if(target.name ==='dni')
            setDoctor({...doctor, dni: target.value })

        if(target.name ==='address'){

            let { description } = doctor

            description.address = target.value

            setDoctor({...doctor, description })
        
        }

        if(target.name ==='phone_main'){

            let { description } = doctor

            description.phone_main = target.value

            setDoctor({...doctor, description })
        
        }

        if(target.name ==='phone_alternative'){

            let { description } = doctor

            description.phone_alternative = target.value

            setDoctor({...doctor, description })
        
        }

        if(target.name ==='name_contact'){

            let { description }:any =  doctor 

            let { contact  }:any  = description
            
            contact.name_contact = target.value

            description = { ... description, contact}

            setDoctor({...doctor, description })
        
        }

        if(target.name ==='phone_contact'){

            let { description }:any =  doctor 

            let { contact  }:any  = description
            
            contact.phone_contact = target.value

            description = { ... description, contact}

            setDoctor({...doctor, description })
        
        }
        
        

    }

    const onChangeTextArea = ({target}:React.ChangeEvent<HTMLTextAreaElement>)=>{

        if(target.name ==='description'){

            let { description } = doctor

            description.description = target.value

            setDoctor({...doctor, description })
        
        }

    }

    const onChangeSelect  = ({target}:React.ChangeEvent<HTMLSelectElement>)=>{

        if(target.name ==='gender')
            setDoctor({ ...doctor,gender:target.value })

        if(target.name ==='marital_status')
            setDoctor({ ...doctor,marital_status:target.value }) 


        if(target.name ==='specialty_pk1'){

            let { description }:any =  doctor 

            description.specialty_pk1 = target.value

            setDoctor({...doctor, description })
        
        }


    }


    const onSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{

        event.preventDefault()


        setIsSaving(true)

        const { datos, mensaje, registros } = await usuarioCtrl.Guardar(token, {...doctor, password:'123456', category_pk1:2})

        if(registros > 1)
            toast.info('Usuario Guardado ', toastConfig.info)


        setDoctor(valueDefault.doctor)

        setIsSaving(false)

        navigate('/main/usuarios/doctores')

    }

    const cmbSpecialities = ()=>{

        if(!especialidades) 
            return (
                <option value="">no existe especialidad</option>

            )
        
        return especialidades.map((e:IEspecialidad, i:number) => 
            <option className='text-capitalize' value={e.pk1} key={e.siglas + i}> {e.siglas + ' - ' + e.name}   </option>
        )

    }

    return (
        <form className="form-container" onSubmit={ onSubmit }>
            {/* Información del doctor */}
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
                            value={doctor.firstname}
                            onChange={onChange}
                            placeholder="Ej: Juan Carlos"
                            required
                    />
                </div>
                <div className="form-group">
                    <label>Apellidos <span className="required">*</span></label>
                    <input
                            name="lastname"
                            value={doctor.lastname}
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
                            value={ObtenerFechaInputUTC(doctor.date_birth)}
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
                                value={doctor.gender} 
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
                            value={doctor.marital_status}
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
                            value={doctor.dni}
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
                            value={doctor.description.phone_main}
                            onChange={onChange}
                            placeholder="Ej: 987654321"
                            required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono Alternativo</label>
                    <input
                            name="phone_alternative"
                            value={doctor.description.phone_alternative}
                            onChange={onChange}
                            placeholder="Opcional"
                    />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico <span className="required">*</span></label>
                    <input
                            type="email"
                            name="email"
                            value={doctor.email}
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
                            value={doctor.description.address}
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
                        value={doctor.ciudad}
                        onChange={onChange}
                        placeholder="Ej: Lima"
                        />
                    </div>
                    <div className="form-group">
                        <label>Provincia <span className="required">*</span></label>
                        <input
                        name="ciudad"
                        value={doctor.ciudad}
                        onChange={onChange}
                        placeholder="Ej: Lima"
                        />
                    </div>
                    <div className="form-group">
                        <label>Distrito <span className="required">*</span></label>
                        <input
                        name="ciudad"
                        value={doctor.ciudad}
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
                        <label>Especialidad<span className="required">*</span></label>
                        <select
                                name="specialty_pk1"
                                value={doctor.description.specialty_pk1}
                                onChange={onChangeSelect}
                                required
                        >
                            <option value={''}>Seleccione una especialidad</option>
                            { cmbSpecialities() }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <textarea
                                name="description"
                                value={doctor.description.description}
                                onChange={onChangeTextArea}
                                placeholder=""
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
                💾 {isSaving ? "Guardando..." : "Guardar doctor"}
                </button>
            </div>
        </form>
    )
}
