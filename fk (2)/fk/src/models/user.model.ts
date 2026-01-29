export interface IUser{
    pk1:number 
    email: string 
    password: string 
    firstname: string 
    lastname: string 
    category_pk1:number  
    date_birth: Date
    gender:string
    marital_status:string
    dni:string
    status:boolean
    
}

interface IDescriptionPaciente{
    phone_main:string
    phone_alternative:string
    address:string
    blood_type:string
    allergy:string
    contact:IContact
    proxy:IProxy
}



interface IDescriptionDoctor{
    specialty_pk1:number
    phone_main:string
    phone_alternative:string
    address:string
    description:string
}

interface IContact{
    name_contact:string
    relation_contact:string
    phone_contact:string
}

interface IProxy{
    name_proxy:string
    relation_proxy:string
    phone_proxy:string
}



export interface IPaciente extends IUser{
    description: IDescriptionPaciente
}

export interface IDoctor extends IUser{
    description: IDescriptionDoctor
}


export interface IEspecialidad{
    pk1: number
    siglas: string
    name: string
    status:boolean
}

