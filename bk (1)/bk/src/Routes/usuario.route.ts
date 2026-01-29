import { Router } from 'express'
import ctrl from '../Controllers/usuario.ctrl'
import { verificarToken, verificarUser } from '../Middleware/autentication.middle'
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

        this.router.get('/all', verificarToken, ctrl.All )//todos la tabla
        //this.ruta.get('/:pk1/pk', ()=> { })
        //this.ruta.get('/:dni/dni', ()=> { })

        this.router.get('/:pagina/:registros/usuarios', verificarToken,ctrl.PaginationxUsuario )

        this.router.get('/specialty', verificarToken, ctrl.Specialty )

        
    }

    post(){

        this.router.post('/token', verificarUser , ctrl.GeneratorToken)
        this.router.post('/refresh/token', verificarToken , ctrl.RefreshToken)
        

        //busqueda usuario por filtro
        this.router.post('/filtro/usuario', ctrl.FiltroxUsuario) 
 

    }

    put(){
        this.router.put('/insert', verificarToken, ctrl.Register)
    }

    patch(){
        /** */
        this.router.patch('/save/usuario', verificarToken, ctrl.GuardarUsuario)
        
    }

    delete(){
        this.router.delete('/delete/usuario', verificarToken, ctrl.DeleteUsuario)
    }

}

const rutas = new Rutas()
export default rutas.router