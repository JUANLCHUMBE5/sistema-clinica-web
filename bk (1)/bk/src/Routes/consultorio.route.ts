import { Router } from 'express'
import ctrl from '../Controllers/consultorio.ctrl'

//import { verificarToken,  } from '../Middleware/autentication.middle'


class Rutas{

    router:Router

    constructor(){
        this.router = Router()

        this.get()  // url
        this.post()  // body

        this.delete()  //delete ***
        this.put()     // insert
        this.patch()   // update
    }


    get(){
        this.router.get('/edificios', ctrl.Edificios )
    }

    post(){
        
        this.router.post('/consultorios', ctrl.Consultorios )
        
    }


    delete(){

    }

    put(){
        this.router.put('/register', ctrl.InsertEdificios )
    }

    patch(){

    }

}

const rutas = new Rutas()
export default rutas.router

