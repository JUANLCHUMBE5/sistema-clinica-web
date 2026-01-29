// fk/src/models/cita.model.ts
export interface ICita {
  pk1?: number;
  patient_pk1: number;
  doctor_pk1: number;
  start_time: string;
  end_time?: string | null;
  status: string;
  notes?: string | null;
}
