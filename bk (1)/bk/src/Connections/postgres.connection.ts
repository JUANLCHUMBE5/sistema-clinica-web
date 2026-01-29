import  colors  from 'colors'
import { Pool }  from 'pg'
import dotenv from 'dotenv'


class Database{

    private static getConnection:Database
    private cnn:any = null


    private constructor(){

        dotenv.config()
        this.Connection()

    }

    static stacticConnection(){

        if(!Database.getConnection){
            Database.getConnection = new Database()
        }

        return Database.getConnection
    }

    Connection(){

        this.cnn = new Pool({
            host:       process.env.BD_HOST ||  'localhost',
            port:       parseInt(process.env.BD_PORT ||'5232') ,
            user:       process.env.BD_USER ||'admin',
            password:   process.env.BD_PSWD ||'123456',
            database:   process.env.BD_BBDD||'default',

            idleTimeoutMillis: 10000,
            max: 2000
        })

        if(!this.cnn)
            console.log(colors.yellow('>server> '), colors.white('BBDD >'), colors.red('DOWN'))
        else
            console.log(colors.yellow('>server> '), colors.white('BBDD >'), colors.red('UP'))
    }

    async Query(ssql:string, binds:any){

        const { rows } = await this.cnn.query(ssql, binds)

        return rows

    }

}

const database = Database.stacticConnection()
export default database