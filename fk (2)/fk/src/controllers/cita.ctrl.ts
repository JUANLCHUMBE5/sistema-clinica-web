// fk/src/controllers/cita.ctrl.ts
import { axioAPI } from "../apis/axio.api";
import { _ApiRutas_ } from "../configs/api.config";
import type { ICita } from "../models/cita.model";

class Ctrl {
  async listarPorPaciente(token: string, patient_pk1: number) {
    const { data } = await axioAPI({
      method: "POST",
      url: _ApiRutas_.Cita + "/por-paciente",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        patient_pk1,
      },
    });

    return {
      datos: data.datos as ICita[],
      mensaje: data.message,
      registros: data.registros,
    };
  }

  async guardar(token: string, cita: ICita) {
    const { data } = await axioAPI({
      method: "PUT",
      url: _ApiRutas_.Cita + "/guardar",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        cita,
      },
    });

    return {
      datos: data.datos as ICita[],
      mensaje: data.message,
      registros: data.registros,
    };
  }
}

const citaCtrl = new Ctrl();
export default citaCtrl;
export type { ICita };
