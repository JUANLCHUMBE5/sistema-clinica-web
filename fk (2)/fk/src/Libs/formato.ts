export function Formato_Ceros(texto:string|number, cantidadDigito:number){
    let temp:string =''
    let newTexto:string = texto.toString()

    const cant:number = newTexto.length
    const cantidadCeros = cantidadDigito - cant

        for (var i = 0; i < cantidadCeros ; i++) {
            temp += '0'
        }

    return temp + newTexto
}

export function Ordenar(data: any[], parametro: string) {

    if(data.length === 0 ) return data

    data = data.sort((a:any,b:any)=>{
        if(a[parametro] > b[parametro])
            return 1

        if(a[parametro] < b[parametro])
            return -1

        return 0
    })

    return data
}
export function OrdenarReverse(data: any, parametro: string) {

    data = data.sort((a:any,b:any)=>{
        if(a[parametro] > b[parametro])
            return 1

        if(a[parametro] < b[parametro])
            return -1

        return 0
    })

    return data.reverse()
}