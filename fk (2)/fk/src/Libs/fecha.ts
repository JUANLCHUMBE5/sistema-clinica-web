/*export function removeDuplicados(data: any, parametro:string) {

    let hash: any = {};

    data = data.filter((o:any) => hash[o[parametro]] ? false : hash[o[parametro]] = true);//hash[o.cursoid]

    return data
}*/


export function FechaActual_Mes(date:string|Date, horas:number=0){
    var fecha = new Date(date) 

    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = 1000 * 60 * 60 * horas // 1seg * min  * hora * cantHoras
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = newDateObj.getMonth().toString()
    const dia = newDateObj.getDate()
    //const anno = newDateObj.getFullYear()

    var pMatricula:string =''


    switch (mes) {
        case '0': pMatricula ='enero' 
                break
        case '1': pMatricula ='febrero' 
                break
        case '2': pMatricula ='marzo' 
                break
        case '3': pMatricula ='abril' 
                break
        case '4': pMatricula ='mayo' 
                break
        case '5': pMatricula ='junio' 
                break
        case '6': pMatricula ='julio' 
                break
        case '7': pMatricula ='agosto' 
                break
        case '8': pMatricula ='setiembre' 
                break
        case '9': pMatricula ='octubre' 
                break
        case '10': pMatricula ='noviembre' 
                break
        case '11': pMatricula ='diciembre' 
                break
    }


    return FormatoDate_Ceros(dia,2) + " " + pMatricula
}


function FormatoDate_Ceros(texto:string|number, cantidadDigito:number){
    let temp:string =''
    let newTexto:string = texto.toString()

    const cant:number = newTexto.length
    const cantidadCeros = cantidadDigito - cant

        for (var i = 0; i < cantidadCeros ; i++) {
            temp += '0'
        }

    return temp + newTexto
}



export function ObtenerHoraZonaHoraria(date: string|Date,horas:number=0) {
    if (date === undefined || !date) return ''

    var fecha = new Date(date);


    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = 1000 * 60 * 60 * horas // 1seg * min  * hora * cantHoras
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = (newDateObj.getMonth() + 1)
    const dia = newDateObj.getDate()
    const anno = newDateObj.getFullYear()

    return FormatoDate_Ceros(dia, 2) + "/" + FormatoDate_Ceros(mes, 2) + "/" + anno + " " + FormatoDate_Ceros(newDateObj.getHours(), 2) + ":" + FormatoDate_Ceros(newDateObj.getMinutes(), 2)

}


export function HoraActual(){
    var f = new Date()

    return FormatoDate_Ceros(f.getHours(),2) + ":" +  FormatoDate_Ceros(f.getMinutes(),2)
}


export function DiaSemana(){

    const dias = [
        'DOM',
        'LUN',
        'MAR',
        'MIE',
        'JUE',
        'VIE',
        'SAB',
      ]

    let fecha 

    fecha = new Date()
    
    const diaSemana =  dias[fecha.getDay()]
    return diaSemana

}

export function ObtenerHoraZonaHoraria_date(date: string|Date,horas:number=0) {
    if (date === undefined || !date) return ''

    var fecha = new Date(date);


    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = 1000 * 60 * 60 * horas // 1seg * min  * hora * cantHoras
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = (newDateObj.getMonth() + 1)
    const dia = newDateObj.getDate()
    const anno = newDateObj.getFullYear()

    return FormatoDate_Ceros(dia, 2) + "/" + FormatoDate_Ceros(mes, 2) + "/" + anno 

}

export function DiaActual(){
    const fecha = new Date()

    const mes = fecha.getMonth() + 1
    const dia = fecha.getDate()
    const anno = fecha.getFullYear()


    return FormatoDate_Ceros(anno, 2) + '-' + FormatoDate_Ceros(mes, 2) + '-' + FormatoDate_Ceros(dia, 2)
}

export function DiaActual_SumaRestaDias(dias:number=0) {
    
    const fecha = new Date()    
    
    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = (1000 * 60) * 60 * 24 * dias // 1000 * 1seg * min  * hora * cantDias
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = (newDateObj.getMonth() + 1)
    const dia = newDateObj.getDate()
    const anno = newDateObj.getFullYear()

    return anno +'-' +  FormatoDate_Ceros(mes, 2) + "-" + FormatoDate_Ceros(dia, 2)  

}

export function Fecha_SumaRestaDias(Fecha:string, dias:number=0) {
    
    const fecha = new Date(Fecha)    
    
    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = (1000 * 60) * 60 * 24 * dias // 1000 * 1seg * min  * hora * cantDias
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = (newDateObj.getMonth() + 1)
    const dia = newDateObj.getDate()
    const anno = newDateObj.getFullYear()

    return anno +'-' +  FormatoDate_Ceros(mes, 2) + "-" + FormatoDate_Ceros(dia, 2)  

}

export function ObtenerFecha(fecha:Date){

    if(fecha===undefined || !fecha || fecha.toDateString() === 'Invalid Date' ) return ''

    const mes = (fecha.getMonth() +1)
    const dia = fecha.getDate()
    const anno =  fecha.getFullYear()

    return FormatoDate_Ceros(dia,2) + "/" + FormatoDate_Ceros(mes,2) + "/" + anno

}

export function ObtenerFechaUTC(fecha:Date){

    if(fecha===undefined || !fecha || fecha.toDateString() === 'Invalid Date' ) return ''

    const mes = (fecha.getUTCMonth() +1)
    const dia = fecha.getUTCDate()
    const anno =  fecha.getUTCFullYear()

    return FormatoDate_Ceros(dia,2) + "/" + FormatoDate_Ceros(mes,2) + "/" + anno

}

export function ObtenerFechaUTCExamen(fecha:Date){

    if(fecha===undefined || !fecha || fecha.toDateString() === 'Invalid Date' ) return ''

    const mes = (fecha.getUTCMonth() +1)
    const dia = fecha.getUTCDate()
   

    return FormatoDate_Ceros(dia,2) + "/" + FormatoDate_Ceros(mes,2) 

}

export function ObtenerFechaHora(_fecha_:Date){

    if(_fecha_===undefined || !_fecha_ /*|| fecha.toDateString() === 'Invalid Date'*/ ) return ''

    const fecha = new Date(_fecha_)

    const mes  = fecha.getMonth()
    const dia  = fecha.getDate()
    const anno = fecha.getFullYear()

    const hora = fecha.getHours()
    const minu = fecha.getMinutes()

    return FormatoDate_Ceros(dia,2) + "/" + FormatoDate_Ceros(mes,2) + "/" + anno + ' ' + FormatoDate_Ceros(hora,2) + ':' + FormatoDate_Ceros(minu,2)

}

export function ObtenerFechaInputUTC(_fecha_:Date){

    if(_fecha_===undefined || !_fecha_ /*|| fecha.toDateString() === 'Invalid Date'*/ ) return ''

    const fecha = new Date(_fecha_)

    const mes  = fecha.getUTCMonth() + 1
    const dia  = fecha.getUTCDate()
    const anno = fecha.getUTCFullYear()


    return anno + "-" + FormatoDate_Ceros(mes,2) + "-" + FormatoDate_Ceros(dia,2)

}

export function FechaDiferencia_dias(Fmax:Date|string , Fmin:Date|string){

    let fmax:any = new Date()
    let fmin:any = new Date()

    if(typeof(Fmax) === 'string')   fmax = new Date(Fmax)
    
    if(typeof(Fmin) === 'string')   fmin = new Date(Fmin)

    const difference= Math.abs( fmax - fmin );
    const days = difference/(1000 * 3600 * 24)

    return Math.ceil(days)

}


export function FechaDiferencia_min(Fmax:Date|string , Fmin:Date|string){

    let fmax:any = new Date()
    let fmin:any = new Date()

    if(typeof(Fmax) === 'string')   fmax = new Date(Fmax)
    
    if(typeof(Fmin) === 'string')   fmin = new Date(Fmin)

    const difference= Math.abs( fmax - fmin );
    const days = difference/(1000 * 60)

    return Math.ceil(days)

}

export function FechaDiferencia_semana(Fmax:Date|string , Fmin:Date|string){

    let semanasConexion:number = 0
    let conex:number = 0

    let comentario:string =''
    let color:string = ''
    let fondo:string = ''

    let fmax:any = new Date()
    let fmin:any = new Date()

    if(typeof(Fmax) === 'string')   fmax = new Date(Fmax)
    
    if(typeof(Fmin) === 'string')   fmin = new Date(Fmin)

    const difference= Math.abs( fmax - fmin );
    const days = difference/(1000 * 3600 * 24)

    semanasConexion = Math.ceil(days)

    if((Math.ceil(semanasConexion) - 1) === 0 ) comentario = ' menos de una semana'
    if((Math.ceil(semanasConexion) - 1) === 1 ) comentario = ' menos de dos semanas'
    if((Math.ceil(semanasConexion) - 1) === 2 ) comentario = ' menos de tres semanas'
    if((Math.ceil(semanasConexion) - 1) === 3 ) comentario = ' menos de cuatro semanas'
    if((Math.ceil(semanasConexion) - 1) === 4 ) comentario = ' menos de un mes'
    if((Math.ceil(semanasConexion) - 1) >= 5 )  comentario = 'mas un mes'

    

    if(conex >= 100 && conex > 90)          color= 'success'
    else if (conex <= 90 && conex > 85)     color= 'warning'
    else if (conex <= 85 )                  color= 'danger'

    if(conex >= 100 && conex > 90)          fondo= '#D1E7DD'
    else if (conex <= 90 && conex > 85)     fondo= '#FFF3CD'
    else if (conex <= 85 )                  fondo= '#F8D7DA'

    return { comentario, color, fondo }
}


export function FechaActual_sinformato(horas:number=0) {
    

    var fecha = new Date();


    var numberOfMlSeconds = fecha.getTime()
    var addMlSeconds = 1000 * 60 * 60 * horas // 1seg * min  * hora * cantHoras
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)


    const mes = (newDateObj.getMonth() + 1)
    const dia = newDateObj.getDate()
    const anno = newDateObj.getFullYear()

    return anno + FormatoDate_Ceros(mes, 2) + FormatoDate_Ceros(dia, 2) + "_" + FormatoDate_Ceros(newDateObj.getHours(), 2) + FormatoDate_Ceros(newDateObj.getMinutes(), 2)

}
