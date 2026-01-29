import db from '../Connections/postgres.connection'
import { IUser } from '../Models/user.model'

class Data{

    async Edificios(){

        try{

            const ssql = 'select * from consultorios.buildings where active'
            const rst = await db.Query(ssql, [])

            return { rst, message:''  }
        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }
    }

    
    async InsertEdificios(consultorio:any){

        try{

            const ssql = 
                `insert into consultorios.offices(building_pk1, door, floor, specialite_pk1, aforo ) 
                 select * from json_populate_recordset(null::record, $1) as (
                    building_pk1            int, 
                    door                    text,
                    floor                   text, 
                    specialite_pk1          int, 
                    aforo                   text
                 )
                returning pk1

                `
        const rst = await db.Query(ssql, [JSON.stringify(consultorio)])

        return { rst, message:''  }
        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }

    }

    
    Consultorios(){

       return  `
                select
                    s.siglas||'-'||b.sigla||'-'||o.floor||o.door codigo ,
                    b.sigla,
                    s.siglas||' - '||s.name especialidad,
                    o.*
                from consultorios.offices o
                inner join consultorios.buildings b on o.building_pk1 = b.pk1
                inner join users.specialties s on o.specialite_pk1 = s.pk1
                where 
                    o.pk1<>0
        
       
       `
    }

    FiltroxEspecialidad(ssql:string, specialite_pk1: number){

        if (specialite_pk1 ===0 || specialite_pk1 === undefined) return ssql
        
        return ssql  + `
                   and s.pk1 = ${specialite_pk1}
                `

    }

    FiltroxCodigo(ssql:string, codigo:string){

        if (codigo === '' || codigo === undefined) return ssql
        
        return ssql  + `
                    and s.siglas||'-'||b.sigla||'-'||o.floor||o.door ilike ${codigo}%
                `

    }

    FiltroxPiso(ssql:string, piso:string){

        if (piso === '' || piso === undefined) return ssql
        
        return ssql  + `
                    and o.floor = '${piso}'
                `

    }

    FiltroxOrdenar(ssql:string){

        return ssql + `  
                        order by
                        especialidad, b.sigla, o.floor, o.door
                        `

    }

    async ejecutar(ssql:string){

        try{
           
            const rst = await db.Query(ssql, [])

            return { rst, message:''  }

        }catch(error:any){

            console.log(error)
            return { rst:[], message:error  }
        }
    }



}





const data = new Data()
export default data