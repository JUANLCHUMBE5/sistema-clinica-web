// fk/src/views/Citas/CitasPaciente.tsx
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useTokenValue } from "../../Providers/token.context";
import type { IHook } from "../../models/Hook.model";
import type { IPaciente } from "../../models/user.model";

import citaCtrl from "../../controllers/cita.ctrl";
import type { ICita } from "../../models/cita.model";   // 👈 SOLO TIPO

import usuarioCtrl from "../../controllers/usuario.ctrl";
import Modal from "../../Components/Modal";
import { toastConfig } from "../../configs/valueDefault";

export default function CitasPaciente() {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const paciente = location.state?.paciente as IPaciente | undefined;

  const tokenValue: IHook = useTokenValue();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [citas, setCitas] = useState<ICita[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [doctores, setDoctores] = useState<IPaciente[]>([]); // reutilizamos modelo user

  const [form, setForm] = useState<ICita>({
    patient_pk1: paciente ? paciente.pk1 : Number(pacienteId),
    doctor_pk1: 0,
    start_time: "",
    end_time: "",
    status: "pendiente",
    notes: "",
  });

  // token desde contexto
  useEffect(() => {
    if (!tokenValue.isLoading) setToken(tokenValue.datos);
  }, [tokenValue]);

  // cargar citas + doctores
  useEffect(() => {
    if (!token || !pacienteId) return;
    void cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, pacienteId]);

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      const [{ datos: citasDB }, { datos: doctoresDB }] = await Promise.all([
        citaCtrl.listarPorPaciente(token, Number(pacienteId)),
        usuarioCtrl.FiltroxUsuario(token, { category_pk1: 2 }), // 2 = doctores
      ]);
      setCitas(citasDB);
      setDoctores(doctoresDB);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar las citas", toastConfig.error);
    } finally {
      setIsLoading(false);
    }
  };

  const abrirNueva = () => {
    setForm({
      patient_pk1: paciente ? paciente.pk1 : Number(pacienteId),
      doctor_pk1: 0,
      start_time: "",
      end_time: "",
      status: "pendiente",
      notes: "",
    });
    setOpenModal(true);
  };

  const abrirEditar = (cita: ICita) => {
    setForm(cita);
    setOpenModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "doctor_pk1") {
      setForm((prev) => ({ ...prev, doctor_pk1: Number(value) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFecha = (fecha: string) => {
    const time = form.start_time ? form.start_time.slice(11, 16) : "08:00";
    setForm((prev) => ({ ...prev, start_time: `${fecha}T${time}:00` }));
  };

  const handleHora = (hora: string) => {
    const date = form.start_time
      ? form.start_time.slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    setForm((prev) => ({ ...prev, start_time: `${date}T${hora}:00` }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.doctor_pk1 || !form.start_time) {
      toast.warn("Selecciona médico y fecha/hora", toastConfig.warning);
      return;
    }
    try {
      await citaCtrl.guardar(token, form);
      toast.success("Cita guardada", toastConfig.success);
      setOpenModal(false);
      void cargarDatos();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo guardar la cita", toastConfig.error);
    }
  };

  const nombrePaciente = paciente
    ? `${paciente.lastname}, ${paciente.firstname}`
    : `Paciente #${pacienteId}`;

  return (
    <Fragment>
      <ToastContainer />

      {/* CARD principal */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>
            <i className="fa-solid fa-calendar-check me-2" />
            Citas del paciente
          </span>
          <button
            className="btn btn-sm btn-light"
            onClick={() => navigate(-1)}
          >
            <i className="fa fa-arrow-left me-1" />
            Volver
          </button>
        </div>

        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
            <div>
              <h5 className="mb-1">{nombrePaciente}</h5>
              {paciente && (
                <small className="text-muted">
                  DNI: {paciente.dni} · Tel: {paciente.description?.phone_main}
                </small>
              )}
            </div>
            <button
              className="btn btn-sm btn-outline-primary mt-2 mt-md-0"
              onClick={abrirNueva}
            >
              <i className="fa fa-plus me-1" />
              Nueva cita
            </button>
          </div>

          <div className="table-responsive rounded-3 border">
            <table className="table table-sm mb-0 align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Fecha / hora</th>
                  <th>Médico</th>
                  <th>Estado</th>
                  <th>Notas</th>
                  <th style={{ width: 60 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Cargando...
                    </td>
                  </tr>
                )}
                {!isLoading && citas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      Aún no hay citas registradas.
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  citas.map((cita) => {
                    const doc = doctores.find((d) => d.pk1 === cita.doctor_pk1);
                    return (
                      <tr key={cita.pk1}>
                        <td>{new Date(cita.start_time).toLocaleString()}</td>
                        <td>
                          {doc
                            ? `${doc.lastname}, ${doc.firstname}`
                            : `#${cita.doctor_pk1}`}
                        </td>
                        <td className="text-capitalize">{cita.status}</td>
                        <td>{cita.notes}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => abrirEditar(cita)}
                          >
                            <i className="fa fa-pen" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL EDITAR / NUEVA CITA */}
      <Modal
        open={openModal}
        title="Editar cita"
        iconTitle="fa-solid fa-calendar-check"
        idModal="cita-paciente"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small">Paciente</label>
                <input
                  className="form-control form-control-sm"
                  value={nombrePaciente}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Médico</label>
                <select
                  name="doctor_pk1"
                  className="form-select form-select-sm"
                  value={form.doctor_pk1 || 0}
                  onChange={handleChange}
                >
                  <option value={0}>-- Seleccione --</option>
                  {doctores.map((d) => (
                    <option key={d.pk1} value={d.pk1}>
                      {d.lastname}, {d.firstname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label small">Fecha</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={form.start_time ? form.start_time.slice(0, 10) : ""}
                  onChange={(e) => handleFecha(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Hora</label>
                <input
                  type="time"
                  className="form-control form-control-sm"
                  value={form.start_time ? form.start_time.slice(11, 16) : ""}
                  onChange={(e) => handleHora(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Estado</label>
                <select
                  name="status"
                  className="form-select form-select-sm"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="pendiente">Confirmación pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="tratado">Tratado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label small">Observaciones</label>
                <textarea
                  name="notes"
                  className="form-control form-control-sm"
                  rows={2}
                  value={form.notes ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setOpenModal(false)}
            >
              Cerrar
            </button>
            <button type="submit" className="btn btn-success btn-sm">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}
