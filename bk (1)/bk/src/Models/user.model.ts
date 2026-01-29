export interface IAuthentication{
    email: string
    password:string
}



export interface IUser extends IAuthentication{
    pk1: number
    firstname:string
    lastname:string
    category_pk1:number
    description:JSON
       
}

