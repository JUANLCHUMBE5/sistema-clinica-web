import { Router } from "express";
import ctrl from "../Controllers/cita.ctrl";
import { verificarToken } from "../Middleware/autentication.middle";

class Rutas {
  router: Router;

  constructor() {
    this.router = Router();
    this.get();
    this.post();
    this.put();
    this.patch();
    this.delete();
  }

  get() {
    // por ahora nada
  }

  post() {
    // listar citas de un paciente
    this.router.post("/por-paciente", verificarToken, ctrl.PorPaciente);
  }

  put() {
    // guardar (insert / update)
    this.router.put("/guardar", verificarToken, ctrl.Guardar);
  }

  patch() {}
  delete() {}
}

const rutas = new Rutas();
export default rutas.router;
