import db from '../Connections/postgres.connection'
import { IUser } from '../Models/user.model'

class Data{

    async All(){

        try{

        const ssql = 'select * from users.users'
        const rst = await db.Query(ssql, [])

        return { rst, message:''  }
        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }
    }

    async FindxEmail(email:string){

        try{

        const ssql = 'select * from users.users where email=$1'
        const rst = await db.Query(ssql, [email])

        return { rst, message:''  }
        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }
    }

    async Register(user:IUser[]){

    try{

        const ssql = 
                `insert into users.users( email, password, firstname, lastname, category_pk1, date_birth, gender, marital_status, dni, description) 
                 select * from json_populate_recordset(null::record, $1) as (
                    email            text, 
                    password         text,
                    firstname        text, 
                    lastname         text, 
                    category_pk1     int,  
                    date_birth       timestamp,
                    gender           text,
                    marital_status   text,
                    dni              text,
                    description      json
                 )
                returning pk1

                `
        const rst = await db.Query(ssql, [JSON.stringify(user)])

        return { rst, message:''  }
        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }

    }



    /** Busqueda por filtro */
    FiltroxUsuario(){
 
        return `
                        select * 
                        from users.users 
                        where
                            pk1 > 0 

                        ` 
        
    }

    FiltroxUsuarioxCategoria(ssql:string, category_pk1: number){

        if(category_pk1 === undefined) return ssql

        const sql = ssql + `
                and category_pk1=${category_pk1}
        `

        return sql

    }

    FiltroxUsuarioxDni(ssql:string, dni: string){

        if(dni === undefined) return ssql

        const sql = ssql + `
                and dni='${dni}'
        `

        return sql

    }

    
    FilterxUsuarioxApellido(ssql:string, apellidos: string){

        if(apellidos === undefined) return ssql

        const sql = ssql + `
                and lastname ilike '%${apellidos}%'
        `

        return sql

    }


    async EjecutaSql(ssql:string){

        try{

            const rst = await db.Query(ssql, [])

            return { rst, message:''  }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }


    }

    async GuardarUsuario(paciente:any){

        try{

            const ssql = `
                    update users.users set 
                            lastname = $1,
                            firstname = $2,
                            email= '${paciente.email}'
                    where
                        pk1 = ${paciente.pk1}


            `

            const rst = await db.Query(ssql, [paciente.lastname, paciente.firstname])

            return { rst, message:''  }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }


    }

    async DeleteUsuario(paciente:any){

        try{

            const ssql = `
                    update users.users set status= false
                    where
                        pk1 = $1


            `

            const rst = await db.Query(ssql, [paciente.pk1])

            return { rst, message:''  }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }

    }

    async PaginationxUsuario(pagina:number, registros:number){

        try{

            const ssql = `
                    select count(*) cant_usuarios
                    from users.users 
                    
            `

            const rest = await db.Query(ssql, [])

            const cantidad_registros:number = rest[0].cant_usuarios

            const sql = `select *
                            from users.users 
                            limit $1 offset ($2 - 1) * $1  + 1  
                        `

            const rst = await db.Query(sql, [registros, pagina])

            return { rst, message:'' , cantidad_registros }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error , cantidad_registros:0 }
        }


    }

    
    async Specialty(){

        try{

            const ssql = `
                    select *
                    from users.specialties 
                    where
                        status
                    
            `

            const rst = await db.Query(ssql, [])

            return { rst, message:'' , size:rst.length }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error , size:0 }
        }


    }

}

const data = new Data()
export default data