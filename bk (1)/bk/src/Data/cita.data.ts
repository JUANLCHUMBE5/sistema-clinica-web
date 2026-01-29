import db from "../Connections/postgres.connection";
import type { ICita } from "../Models/cita.model";

class CitaData {
  async PorPaciente(patient_pk1: number) {
    try {
      const ssql = `
        select c.*
        from clinica.citas c
        where c.patient_pk1 = $1
        order by c.start_time desc
      `;
      const rst = await db.Query(ssql, [patient_pk1]);
      return { rst, message: "" };
    } catch (error: any) {
      console.log(error);
      return { rst: [], message: error };
    }
  }

  async Guardar(cita: ICita) {
    try {
      if (cita.pk1 && cita.pk1 > 0) {
        // UPDATE
        const ssql = `
          update clinica.citas
          set patient_pk1 = $1,
              doctor_pk1  = $2,
              start_time  = $3,
              end_time    = $4,
              status      = $5,
              notes       = $6
          where pk1 = $7
          returning *;
        `;
        const params = [
          cita.patient_pk1,
          cita.doctor_pk1,
          cita.start_time,
          cita.end_time ?? null,
          cita.status,
          cita.notes ?? null,
          cita.pk1,
        ];
        const rst = await db.Query(ssql, params);
        return { rst, message: "" };
      } else {
        // INSERT
        const ssql = `
          insert into clinica.citas
            (patient_pk1, doctor_pk1, start_time, end_time, status, notes)
          values
            ($1, $2, $3, $4, $5, $6)
          returning *;
        `;
        const params = [
          cita.patient_pk1,
          cita.doctor_pk1,
          cita.start_time,
          cita.end_time ?? null,
          cita.status,
          cita.notes ?? null,
        ];
        const rst = await db.Query(ssql, params);
        return { rst, message: "" };
      }
    } catch (error: any) {
      console.log(error);
      return { rst: [], message: error };
    }
  }
}

const data = new CitaData();
export default data;
