import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useTokenValue } from "../../Providers/token.context";
import type { IHook } from "../../models/Hook.model";
import type { IPaciente } from "../../models/user.model";
import usuarioCtrl from "../../controllers/usuario.ctrl";
import { toastConfig } from "../../configs/valueDefault";

export default function Citas() {
  const navigate = useNavigate();
  const tokenValue: IHook = useTokenValue();

  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Obtener token desde el contexto
  useEffect(() => {
    if (!tokenValue.isLoading) {
      setToken(tokenValue.datos);
    }
  }, [tokenValue]);

  // Foco inicial en el input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscar(e.target.value);
  };

  const handleBuscar = async () => {
    if (!buscar.trim()) return;

    setIsLoading(true);
    try {
      // Si es solo números: buscar por DNI, si no, por apellidos
      let filtros: any = { category_pk1: 1 }; // 1 = pacientes
      if (/^\d{1,8}$/.test(buscar.trim())) {
        filtros.dni = buscar.trim();
      } else {
        filtros.apellidos = buscar.trim();
      }

      const { datos } = await usuarioCtrl.FiltroxUsuario(token, filtros);
      setPacientes(datos);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo buscar pacientes", toastConfig.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleBuscar();
    }
  };

  // Navegar a la pantalla de citas del paciente
  const irACitasPaciente = (p: IPaciente) => {
    navigate(`/main/usuarios/pacientes/${p.pk1}/citas`, {
      state: { paciente: p },
    });
  };

  // Botón "Nueva cita" (usa el primer paciente encontrado)
  const handleNuevaCita = () => {
    if (pacientes.length === 0) {
      toast.warn("Primero busca un paciente", toastConfig.warning);
      return;
    }

    const p = pacientes[0]; // tomamos el primer resultado
    irACitasPaciente(p);
  };

  const tbody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4">
            Cargando...
          </td>
        </tr>
      );
    }

    if (pacientes.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4 text-muted">
            Busca un paciente por DNI o apellido.
          </td>
        </tr>
      );
    }

    return pacientes.map((p) => (
      <tr key={p.pk1}>
        <td>{p.dni}</td>
        <td>{`${p.lastname}, ${p.firstname}`}</td>
        <td>{p.description?.phone_main ?? ""}</td>
        <td>{p.description?.address ?? ""}</td>
        <td className="text-center">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => irACitasPaciente(p)}
          >
            <i className="fa fa-calendar-check me-1" />
            Citas
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <Fragment>
      <ToastContainer />

      <div className="card shadow-sm border-0">
        {/* Encabezado */}
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <i className="fa-solid fa-calendar-check me-2" />
          <span>Módulo de citas</span>
        </div>

        <div className="card-body">
          {/* Barra superior (buscador + nueva cita) */}
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-2">
            <div className="flex-grow-1">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  Buscar
                </span>
                <input
                  type="text"
                  ref={inputRef}
                  className="form-control"
                  placeholder="DNI o Apellido"
                  value={buscar}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleBuscar}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-success btn-sm px-3"
                onClick={handleNuevaCita}
              >
                <i className="fa fa-plus me-1" />
                Nueva cita
              </button>
            </div>
          </div>

          {/* Tabla de pacientes */}
          <div className="table-responsive rounded-3 border">
            <table className="table table-sm mb-0 align-middle">
              <thead className="table-primary">
                <tr>
                  <th>DNI</th>
                  <th>Paciente</th>
                  <th>Contacto</th>
                  <th>Dirección</th>
                  <th style={{ width: 90 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>{tbody()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
