


//Archivo que reune todas las llamadas a la Api de OpenSky

const root = `https://opensky-network.org/api`

export async function recuperarVuelos() {
    console.log('Llamada a recuperar vuelos de Open Sky')
    /* 
        TO DO: guardar la cabezera del limit rate para evitar un 429
        y/o detectar error 429
    */
    try {

        var url = root + `/states/all`
        var data = await fetch(url)
        var correctJson = await data.json()
        if (correctJson.states === null) {
            throw new Error(503)
        }
        return correctJson
    } catch (e) {
        console.log('Error recuperando vuelo')
        return undefined
    }
}

export function vueloAleatorio(vuelos) {
    if (vuelos === undefined) { return undefined }
    console.log('Llamada a recuperar un vuelo aleatorio, vuelos: ', vuelos.length)
    if (vuelos.states === null) {
        throw new Error()
    }
    var max = vuelos.states.length
    var randomIndex = Math.floor(Math.random() * max)
    return vuelos.states[randomIndex]
}

export async function recuperarPath(vuelo) {
    if (vuelo === undefined) { return undefined }
    var url = root + `/tracks/all?icao24=${vuelo[0]}&time=0`

    var data = await fetch(url)
    var correctJson = await data.json()
    vuelo[vuelo.length + 1] = correctJson.path
    return vuelo
}