export interface IEdificio{
    active?: boolean
    nombre: string
    pk1?: number
    sigla: string
    ubicacion: string
}

export interface IConsultorio{
    pk1?:number
    building_pk1: number
    door: string
    floor: string
    specialite_pk1: number
    aforo: string
    status: boolean

    codigo?:string
    sigla?:string
    especialidad?:''

}