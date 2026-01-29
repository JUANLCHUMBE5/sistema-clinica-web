import db from '../Connections/postgres.connection'

class Data{

    async Users(){


        try{

            const ssql = 'select * from users '

            const rst = db.Query(ssql, [])

            return {datos: rst , message:'ok'}

        }catch (error:any){
            return {datos: [] , message:error.details}
        }

    }

}

const data = new Data()
export default data