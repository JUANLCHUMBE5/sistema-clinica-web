import React, { Fragment, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Modal from '../../Components/Modal'
import { toastConfig, valueDefault } from '../../configs/valueDefault'
import type { IHook } from '../../models/Hook.model'
import { useTokenValue } from '../../Providers/token.context'
import consultorioCtrl from '../../controllers/Consultorios.ctrl'

import usuarioCtrl from '../../controllers/usuario.ctrl'
import type { IEspecialidad } from '../../models/user.model'
import type { IConsultorio, IEdificio } from '../../models/consultorio.model'
import { Formato_Ceros, Ordenar, OrdenarReverse } from '../../Libs/formato'


type SortKey = "code" | "especialidad" | "piso" | "edificio"
type SortDir = "asc" | "desc"



export default function Consultorios():React.ReactElement {


    //recupero el token
    const [ token , setToken ] = useState<string>(valueDefault.token)
    const tokenValue:IHook = useTokenValue()

    //edificios
    const [ edificios, setEdificios ] = useState<IEdificio[]>([])

    const [ especialidades, setEspecialidades] = useState<IEspecialidad[]>([])

    // orden
    const [sortKey, setSortKey] = useState<SortKey>("code")
    const [sortDir, setSortDir] = useState<SortDir>("asc")

    const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const [ consultorio, setConsultorio ] = useState<IConsultorio>( valueDefault.consultorio)
    const [ consultorios, setConsultorios ] = useState<[IConsultorio]>([valueDefault.consultorio])

    const [ especialidad, setEspecialidad ] = useState<number>(0)
    const [ piso, setPiso ] = useState<string>('')


    // modal nuevo
    const refNPiso = useRef<HTMLInputElement>(null)
    const refNEdificio = useRef<HTMLSelectElement>(null)
    const refNAforo = useRef<HTMLInputElement>(null)
    const refNPuerta = useRef<HTMLInputElement>(null)
    const refNEspecialidadSel = useRef<HTMLSelectElement>(null)


    useEffect(()=>{

        const frm = async()=>{

            if(token === '') return

            const  [ Edificios, Especialidades, Consultorios ] = await Promise.all([
                consultorioCtrl.Edificios(token),
                usuarioCtrl.Especialidades(token),
                consultorioCtrl.Listar(token,{})
            ])

            if(Edificios.registros === 0 || Especialidades.registros === 0 || Consultorios.registros === 0 ){
                toast.info('No existe registros', toastConfig.info)
                return
            }

            setEdificios(Edificios.datos)
            setEspecialidades(Especialidades.datos)
            setConsultorios(Consultorios.datos)

        }


        frm()

    },[token])


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

            if (token === '') return 

            const { datos } = await consultorioCtrl.Listar(token, { especialidad, piso  })

            setConsultorios(datos)

        }

        frm()

    },[token, especialidad, piso])


    const abrirNuevo = () => {
        

        setIsOpenModal(true)

        setIsLoading(false)

        setConsultorio(valueDefault.consultorio)

        
    };

    const getSortIcon = (column: SortKey) =>
        sortKey !== column ? "↕" : sortDir === "asc" ? "↑" : "↓"


    const ordenar = (key: SortKey) => {

        if(sortDir === 'asc'){
            const asc:any = OrdenarReverse(consultorios, key)
            setConsultorios(asc)

        }
        else {
            const desc:any = Ordenar(consultorios, key)
            setConsultorios(desc)

        }

        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"))

        }
        else {
            setSortKey(key);
            setSortDir("asc");
        }
    }

    const handleInput = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

        if(target.name === 'piso')
            setConsultorio({...consultorio, floor: target.value })

        if(target.name === 'puerta')
            setConsultorio({...consultorio, door: Formato_Ceros(target.value,2) })


        if(target.name === 'aforo')
            setConsultorio({...consultorio, aforo: target.value })

    }

    const handleSelect = ({target}:React.ChangeEvent<HTMLSelectElement>)=>{

        if(target.name === 'especialidad')
            setConsultorio({...consultorio, specialite_pk1: parseInt(target.value)})

        if(target.name === 'edificio')
            setConsultorio({...consultorio, building_pk1: parseInt(target.value)})

    }

    
    const handleSelectFilter = ({target}:React.ChangeEvent<HTMLSelectElement>)=>{

        if(target.name === 'especialidadFilter')
            setEspecialidad(parseInt(target.value))

    }

    
    const handleInputFilter = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

        if(target.name === 'pisoFilter')
            setPiso(target.value)

    }

    
    const onSubmitNuevo =async (event:React.FormEvent<HTMLFormElement>)=>{

        event.preventDefault()

        setIsLoading(true)

        await consultorioCtrl.Register(token, consultorio)

        const { datos } = await consultorioCtrl.Listar(token, {})

        setConsultorios(datos)


        setIsLoading(false)
        setIsOpenModal(false)

        setEspecialidad(0)
        setPiso('')

    }

    const bodyEdificios = ()=>{

        if(edificios.length === 0)
            return(
                <option key={'edificios-null'} value={''}> no hay datos </option>             
            )

        return(
            edificios.map((edificio:IEdificio, e:number) =>{
                return(
                    <option key={'edificios' + e } value={edificio.pk1}>{ edificio.sigla + ' - ' + edificio.nombre }</option>
                )
            })
        )
    }

    const bodyEspecialidades = ()=>{

        if(especialidades.length === 0)
            return(
                <option key={'especialidad-null'} value={''}> no hay datos </option>             
            )
        return(
            especialidades.map((especialidad:IEspecialidad, e:number) =>{
                return(
                    <option key={'especialidad' + e } value={especialidad.pk1}>{ especialidad.siglas + ' - ' + especialidad.name }</option>
                )
            })
        )
    }

   const tableBodyConsultorios = ()=>{

        if(consultorios.length === 0)
            return(
                <tr key={'table-consultorios-0'}>
                    <td colSpan={6} align='center' className='align-middle'>No hay registro</td>
                </tr>
            )

        if(consultorios[0].pk1 === 0)
            return(
                <tr key={'table-consultorios-0'}>
                    <td colSpan={6} align='center' className='align-middle'>No hay registro</td>
                </tr>
            )

        return(
            consultorios.map((c:IConsultorio, i:number) =>{

                return(
                    <tr key={'table-consultorios-' + i }>
                        <td align='center'>{ c.codigo  }</td>
                        <td align='left'>{ c.especialidad  }</td>
                        <td align='center'>{ c.sigla  }</td>
                        <td align='center'>{ c.floor  }</td>
                        <td align='center'>{ c.door  }</td>
                        <td align='center'>{ c.aforo  }</td>
                    </tr>
                )

            })
        )

        
   }




    return (
        <Fragment>
            <div className="container-fluid py-4">
                {/* Header */}
                <div className="row align-items-center mb-4">
                    <div className="col">
                        <h2 className="mb-1 fw-bold">Gestión de Consultorios</h2>
                        <div className="text-secondary small">Administre los consultorios médicos del centro</div>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary btn-lg" onClick={abrirNuevo}>
                        + Nuevo consultorio
                        </button>
                    </div>
                </div>

                {/* Filtros */}
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-light border-0 py-2">
                        <h6 className="mb-0 fw-semibold">Filtros de Búsqueda</h6>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label small text-secondary">Especialidad</label>
                                <select     //ref={refEspecialidadSel} 
                                            name='especialidadFilter'
                                            className="form-select" defaultValue=""
                                            onChange={ handleSelectFilter }
                                            value={ especialidad }
                                            >
                                    <option value="0">— Todas —</option>
                                    { bodyEspecialidades() }
                                    
                                </select>
                            </div>

                            <div className="col-md-2">
                                <label className="form-label small text-secondary">Piso</label>
                                <div className="input-group">
                                    <span className="input-group-text">⇅</span>
                                    <input
                                        //ref={refPiso}
                                        name='pisoFilter'
                                        className="form-control"
                                        onChange={ handleInputFilter }
                                        value={ piso }
                                        //onKeyDown={(e) => e.key === "Enter" && filtrar()}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                 {/* Tabla */}
                <div className="card shadow-sm border-0 container">
                    <div className="card-header bg-white border-bottom py-2">
                        <div className="d-flex align-items-center justify-content-between">
                        <h6 className="mb-0 fw-semibold">Lista de Consultorios</h6>
                        <span className="badge bg-light text-dark border">
                            {/*total} {total === 1 ? "registro" : "registros"*/}
                        </span>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm table-bordered table-striped table-hover mb-0 align-middle">
                            <thead className="table-primary text-white">
                                <tr>
                                    <td
                                        className="fw-semibold"
                                        style={{ cursor: "pointer"}}
                                        width={'12%'}    
                                        align='center'
                                        //onClick={() => ordenar("code")}
                                    >
                                        Código <small>{/*getSortIcon("code")*/}</small>
                                    </td>
                                    <td
                                        className="fw-semibold"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => ordenar("especialidad")}

                                        align='center'
                                    >
                                        Especialidad <small>{getSortIcon("especialidad")}</small>
                                    </td>

                                    <td className="fw-semibold text-center" 
                                        align='center'
                                        width={'12%'}  
                                        onClick={() => ordenar("edificio")}
                                    >
                                        Edificio <small>{getSortIcon("edificio")}</small>
                                    </td>

                                    <td
                                        className="fw-semibold "
                                        style={{ cursor: "pointer" }}
                                        onClick={() => ordenar("piso")}
                                        width={'12%'}  
                                        align='center'
                                    >
                                        Piso <small>{getSortIcon("piso")}</small>
                                    </td>
                                    <td className="fw-semibold " 
                                        align='center'
                                        width={'12%'} 
                                    >
                                        Puerta
                                    </td>
                                    <td
                                        className="fw-semibold"
                                        style={{ cursor: "pointer" }}
                                        width={'12%'} 
                                        align='center'
                                    >
                                        Foro 
                                    </td>
                                    
                                </tr>
                            </thead>

                            <tbody className="text-nowrap">
                                { tableBodyConsultorios() }
                            </tbody>
                        </table>
                    </div>

                    
                </div>
            </div>


            {/* Modal Nuevo */}
            <Modal 
                    open={isOpenModal}
                    title='Nuevo Consultorio'
                    idModal='idConsultorio'
                    iconTitle=''
                    size='lg'
            >
                <form onSubmit={onSubmitNuevo}>
                    <div className="modal-body">
                        <div className="row g-3">
                            
                            <div className="col-md-6">
                                <label className="form-label">Especialidad *</label>
                                <select name='especialidad' ref={refNEspecialidadSel} className="form-select" defaultValue=""
                                        onChange={ handleSelect }
                                        value={ consultorio.specialite_pk1 }
                                >
                                    <option value="">— Seleccione —</option>
                                    { bodyEspecialidades() }
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Edificio</label>
                                <select name='edificio' ref={refNEdificio} className="form-select" defaultValue="A"
                                        onChange={ handleSelect }
                                        value={ consultorio.building_pk1 }
                                >
                                    <option value="">— Seleccione —</option>
                                    { bodyEdificios() }
                                </select>
                            </div>
                        </div>
                        <div className="row g-3">
                            
                            <div className="col-md-3">
                                <label className="form-label">Piso</label>
                                <input name='piso' ref={refNPiso} className="form-control" 
                                        placeholder="Ej: 2"     
                                        onChange={ handleInput }  
                                        value={ consultorio.floor }      
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Puerta</label>
                                <input name='puerta' ref={refNPuerta} className="form-control" 
                                        onChange={ handleInput }   
                                        value={ consultorio.door }     
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Aforo (mín. 2)</label>
                                <input name='aforo' ref={refNAforo} type="number" min={2} className="form-control" 
                                        defaultValue={2}    
                                        onChange={ handleInput }    
                                        value={ consultorio.aforo }    
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-primary"
                                type='submit'
                                disabled={ isLoading }
                        >
                            {   
                                !isLoading ?
                                    'guardar'
                                :
                                    'cargando'
                                
                            }
                        </button>
                        <button className="btn btn-sm btn-danger"
                                onClick={()=>setIsOpenModal(false)}
                        >
                            cerrar
                        </button>
                    </div>
                    </div>
                </form>
            </Modal>


            <ToastContainer />
        </Fragment>
    )
}
