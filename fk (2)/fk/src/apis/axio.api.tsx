import axios from 'axios'
import { _API_ } from '../configs/api.config'

const URI= _API_._API_PROTOCOLO+'://'+_API_._API_URI+':'+_API_._API_PORT    


export const axioAPI = axios.create({
    baseURL: URI,
    headers:{
        'Content-Type':'application/json'
    }
})