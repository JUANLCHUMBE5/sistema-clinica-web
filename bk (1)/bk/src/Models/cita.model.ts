export interface ICita {
  pk1?: number;          // opcional, solo para editar
  patient_pk1: number;   // fk a users.users
  doctor_pk1: number;    // fk a users.users
  start_time: string;    // ISO string: '2025-06-20T09:00:00'
  end_time?: string | null;
  status: string;        // pendiente | confirmado | tratado | cancelado
  notes?: string | null;
}
