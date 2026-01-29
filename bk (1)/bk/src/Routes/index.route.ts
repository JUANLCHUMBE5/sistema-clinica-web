import { Router } from 'express'
import indexCtrl from '../Controllers/index.ctrl'

class Rutas{

    router:Router

    constructor(){
        this.router = Router()

        this.get()
        this.post()
        this.delete()
        
    }

    get(){

        this.router.get('/' , indexCtrl.Index )
        this.router.get('/users' , indexCtrl.Users)
        this.router.get('/users/:id/user' , indexCtrl.UsersxId)

    }

    post(){
        this.router.post('/users/create' , indexCtrl.Create )
    }

    delete(){
        this.router.delete('/' , (req, res )=> { res.json({ saludo:'hola mundo delete'}) })
    }

}

const rutas = new Rutas()
export default rutas.router