import { Request, Response } from "express";
import data from "../Data/cita.data";
import type { ICita } from "../Models/cita.model";

class CitaCtrl {
  // listar citas por paciente
  async PorPaciente(req: Request, res: Response): Promise<Response | any> {
    const { patient_pk1 } = req.body;

    const { rst, message } = await data.PorPaciente(Number(patient_pk1));

    return res
      .status(200)
      .json({ datos: rst, message, registros: rst.length });
  }

  // insertar / actualizar cita
  async Guardar(req: Request, res: Response): Promise<Response | any> {
    const { cita } = req.body as { cita: ICita };

    const { rst, message } = await data.Guardar(cita);

    return res
      .status(200)
      .json({ datos: rst, message, registros: rst.length });
  }
}

const ctrl = new CitaCtrl();
export default ctrl;
