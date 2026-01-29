import { Fragment, useEffect, useState, useRef  } from "react"
import { toastConfig, valueDefault } from "../../configs/valueDefault"
import type { IHook } from "../../models/Hook.model"
import { useTokenValue } from "../../Providers/token.context"
import usuarioCtrl from "../../controllers/usuario.ctrl"
import type { IPaciente } from "../../models/user.model"
import { toast, ToastContainer } from "react-toastify"
import Modal from "../../Components/Modal"
import { Ordenar, OrdenarReverse } from "../../Libs/formato"
import { Link } from "react-router-dom"


type SortKey = "lastname" | "firstname" | "telefono";
type SortDir = "asc" | "desc"


export default function Pacientes() {

  const [ token , setToken ] = useState<string>(valueDefault.token)
  const tokenValue:IHook = useTokenValue()

  const [ isLoading , setIsLoading ] = useState<boolean>(false)

  const [ pacientes, setPacientes ] = useState<IPaciente[]>([valueDefault.paciente])
  const [ paciente, setPaciente ] = useState<IPaciente>(valueDefault.paciente)
  const [ buscar, setBuscar ] = useState<string>('')


  const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false)
  const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState<boolean>(false)


    // Orden / paginación
  const [sortKey, setSortKey] = useState<SortKey>("lastname");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  //const [page, setPage] = useState<number>(1);
  //const pageSize = 10;

  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(()=>{

    const frm = ()=>{

       inputRef.current!.focus()
    }

    frm()

  },[])

  useEffect(()=>{

      const frm = ()=>{

      if(!tokenValue.isLoading){
          setToken(tokenValue.datos)
      }
      
      }

      frm()

  },[tokenValue])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key){ 
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
      OrdenarReverse(pacientes,key)
    }
    else {
      setSortKey(key)
      setSortDir("asc")
      Ordenar(pacientes,key)
    }
  }


  const handleInput = ({target}:React.ChangeEvent<HTMLInputElement>)=>{

    if(target.name === 'buscar')
      setBuscar(target.value)

    if(target.name === 'email'){
      setPaciente({ ...paciente, email: target.value})
    }

    if(target.name === 'lastname'){
      setPaciente({ ...paciente, lastname: target.value})
    }

    if(target.name === 'firstname'){
      setPaciente({ ...paciente, firstname: target.value})
    }

    if(target.name === 'telefono'){

      const description = paciente.description

      const newDescription = { ...description , telefono: target.value}


      setPaciente({ ...paciente, description: newDescription})
    }

    if(target.name === 'tipo'){

      const description = paciente.description

      const newDescription = { ...description , tipo: target.value}


      setPaciente({ ...paciente, description: newDescription})
    }

  }

  const handleBuscar = async()=>{

    setIsLoading(true)

    console.log('buscar> ', buscar)
    
    if (buscar && !/^\d{1,8}$/.test(buscar)) {

      const { datos: pacientes, mensaje, registros } = await usuarioCtrl.FiltroxUsuario(token, {apellidos: buscar, category_pk1:3})
      setPacientes(pacientes)

    }else{

      const { datos: pacientes, mensaje, registros } = await usuarioCtrl.FiltroxUsuario(token, {dni: buscar, category_pk1:3})
      setPacientes(pacientes)
    }

    setBuscar('')
    setIsLoading(false)

  }

  const handleEdit = (paciente:IPaciente)=>{

    setIsOpenModal(true)
    setPaciente(paciente)

  }

  const handleGuardar = async(event:React.FormEvent<HTMLFormElement>)=>{

    event.preventDefault()

    /**Guardar */
    await usuarioCtrl.Guardar(token, paciente)
    toast.info('se actualizo el usuario', toastConfig.info)

    setIsOpenModal(false)

  }


  const handleDisabled = (paciente:IPaciente)=>{

    setIsOpenDeleteModal(true)
    setPaciente(paciente)
  }

  const handleDelete = async(event:React.FormEvent<HTMLFormElement>)=>{

    event.preventDefault()

    /**Borrar */
    await usuarioCtrl.Delete(token, paciente)
    toast.info('se elimino el usuario', toastConfig.info)

    setIsOpenDeleteModal(false)
    setPacientes([])


  }

  const tbody = () => {
    // Mostrar "No se encontraron..." solo si YA hubo búsqueda
    if (isLoading ) {
      return (
        <tr>
          <td colSpan={6} className="text-center text-muted py-5">
            <div className="d-flex flex-column align-items-center">
              <i className="fa-solid fa-spinner-scale mb-2 fa-spin" style={{ fontSize: "3rem" }} />
              <h5 className="text-muted">Buscando</h5>
            </div>
          </td>
        </tr>
      );
    }
  
    if (pacientes.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center text-muted py-5">
            <div className="d-flex flex-column align-items-center">
              <i className="fa-regular fa-file-lines mb-2" style={{ fontSize: "3rem" }} />
              <h5 className="text-muted">Sin resultados</h5>
            </div>
          </td>
        </tr>
      );
    }

    if (pacientes[0].dni === "") {
      return (
        <tr>
          <td colSpan={6} className="text-center text-muted py-5">
            <div className="d-flex flex-column align-items-center">
              <i className="fa-regular fa-file-lines mb-2" style={{ fontSize: "3rem" }} />
              <h5 className="text-muted">Buscar un paciente</h5>
            </div>
          </td>
        </tr>
      );
    }

    return pacientes.map((p: IPaciente, i: number) => (
      <tr   key={`tabla-pacientes-${ i}`} 
            className={"border border-primary"}
            style={ !p.status ? {background:'rgba(201, 201, 201, 0.8)'} : {} }
      
      >
        <td>
          <div className="row">
            <div className="col-5">
              <center>
                <img
                  // @ts-ignore
                  src={ p.photo ?? '/images/paciente.png'}
                  alt={`${p.firstname} ${p.lastname}`}
                  className="img-thumbnail"
                  width={'70px'}
                />
              </center>
            </div>
            <div className="col-7">
              <div className="d-grid gap-2 flex-wrap align-item-center">
                <button
                  className="btn btn-outline-primary px-3"
                  //onClick={() => abrirHistorial(p)}
                  title="Historial"
                  style={{ fontSize: ".75rem", height:'20px' }}
                >
                  <i className="fa-solid fa-book-medical me-1"></i>
                  Historial
                </button>
                <button
                  className="btn btn-outline-info px-3"
                  //onClick={() => abrirCitas(p)}
                  title="Gestionar citas"
                  style={{ fontSize: ".75rem", height:'20px' }}
                >
                  <i className="fa-solid fa-calendar-days me-1"></i>
                  Cita
                </button>
              </div>
            </div>
          </div>

        </td>
        <td align="left" className="align-middle">{ p.lastname + ', ' + p.firstname }</td>
        <td align="center" className="align-middle">{ p.description === null ?  '' : p.description.phone_main }</td>
        <td align="left" className="align-middle">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <i className="fa-solid fa-map-marker-alt me-2 text-danger"></i>
              <small className="text-muted">{p.description!.address! ?? "—"}</small>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-calendar me-2 text-info"></i>
              <small className="text-muted">Últ. visita: 15/08/2024</small> 
            </div>
          </div>
        </td>
        <td align="center" className="align-middle">{ p.description === null ?  '' : p.description!.blood_type! }</td>
        <td align="center" className="align-middle">
          {/**accciones */}
            <button className="btn btn-outline-warning btn-sm">
              <i className="fa fa-pencil"></i>
            </button>
          {
            p.status &&
              <button className="btn btn-outline-danger btn-sm"
                      onClick={()=> handleDisabled(p) }
              
              >
                <i className="fa fa-trash"></i>
              </button>
          }
        </td>
      </tr>
    ))
   
  }


  return (
      <Fragment>
        <ToastContainer />
        <div className="card">
          <div className="card-header bg-primary text-white">
            <div className="card-title">
              <i className="fa-solid fa-bed"></i> Pacientes
            </div>
          </div>
          <div className="card-body">
            
            <div className="row justify-content-end">
              <div className="col-xl-1 col-lg-1 col-md-2 col-sm-12 col-12">
                <Link to="/main/usuarios/paciente/registro">Registrar</Link>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white" id="basic-addon1">Buscar</span>
                  <input  type="text" 
                          name="buscar"
                          ref={inputRef}
                          className="form-control border border primary" 
                          placeholder="documento de identidad ó Apellido"  
                          onChange={ handleInput}
                          value={buscar}
                          />
                  <button className="btn btn-sm btn-outline-primary" 
                          onClick={ handleBuscar }
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>


            <table  className="table-bordered table-hover table-sm border border-white w-100" 
                    style={{fontSize:'small'}}

            >
              <thead className='bg-primary text-white fw-bold '>
                <tr>
                  <td   className="text-center border-0 py-3" 
                        width={'20%'}
                        align="center"
                  >
                    <i className="fa-solid fa-user-circle me-2"></i>
                    Paciente
                  </td>
                  <td
                    align="center"
                    className="border-0 py-3"
                    role="button"
                    onClick={() => toggleSort("lastname")}
                    title="Ordenar por Apellido"
                    width={'15%'}
                  >
                    <i className="fa-solid fa-address-card me-2"></i>
                    Datos Personales {sortKey === "lastname" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </td>
                  <td
                    align="center"
                    className="border-0 py-3"
                    role="button"
                    onClick={() => toggleSort("firstname")}
                    title="Ordenar por Nombre"
                    width={'15%'}
                  >
                    <i className="fa-solid fa-user me-2"></i> Contacto 
                  </td>
                  <td   className="border-0 py-3" 
                         width={''}
                         align="center"
                  >
                    <i className="fa-solid fa-map-marker-alt me-2"></i>
                    Ubicación/Visitas
                  </td>
                  <td
                    className="text-center border-0 py-3"
                    align="center"
                    role="button"
                    onClick={() => toggleSort("telefono")}
                    title="Ordenar por Teléfono"
                    width={'8%'}
                  >
                    <i className="fa-solid fa-droplet me-1"></i> Sangre 
                  </td>
                  <td className="text-center border-0 py-3" 
                      width={'8%'}
                      align="center"
                  >
                    <i className="fa-solid fa-cogs me-2"></i> Acciones
                  </td>
                </tr>
              </thead>
              <tbody>
                { 
                  tbody() 
                }
              </tbody>
            </table>
          </div>
          

        </div>
        
        {/** */}
        <Modal 
              open={ isOpenModal }
              title="Paciente"
              iconTitle="fa-solid fa-bed"
              idModal="paciente"
              size="md"
              key={'modal-update'}
        >
          <form onSubmit={ handleGuardar }>
            <div className="modal-body">
              <div className="row justify-content-center">
                <div className="col-11">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input  type="text" 
                            name="email" 
                            className="form-control" 
                            placeholder="email"  
                            value={ paciente.email } 
                            onChange={ handleInput }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Apellidos</span>
                    <input  type="text" 
                            name="lastname" 
                            className="form-control" 
                            placeholder="apellidos"  
                            value={ paciente.lastname } 
                            onChange={ handleInput }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre</span>
                    <input type="text" name="firstname" className="form-control" placeholder="email"  value={ paciente.firstname } />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Telefono</span>
                    <input type="text" name="telefono" className="form-control" placeholder="email"  value={ paciente.description.phone_main } />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tipo de sangre</span>
                    <input type="text" name="tipo" className="form-control" placeholder="email"  value={ paciente.description.blood_type } />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-around">
              
              <button type="submit" className="btn btn-sm btn-outline-primary">
                <i className="fa fa-save"></i>
              </button>
              <button className="btn btn-danger btn-sm" onClick={ ()=> setIsOpenModal(false)}>
                cerrar
              </button>
                
            </div>
          </form>
        </Modal>
        
        {/** */}
        <Modal
              open={ isOpenDeleteModal }
              title="Paciente"
              iconTitle="fa-solid fa-bed"
              background="bg-danger"
              idModal="paciente"
              size="md"
              key={'modal-delete'}
        >
          <form onSubmit={ handleDelete }>
            <div className="modal-body">
                confirmar si se deshabilitar al paciente { paciente.lastname + ', '  + paciente.firstname } 
            </div>
            <div className="modal-footer justify-content-around">
                
                <button type="submit" className="btn btn-sm btn-outline-danger">
                  <i className="fa fa-trash"></i> confirmar
                </button>
                <button className="btn btn-danger btn-sm" onClick={ ()=> setIsOpenDeleteModal(false)}>
                  cerrar
                </button>
                  
            </div>
          </form>  
        </Modal>
        
      </Fragment>
    )
}
