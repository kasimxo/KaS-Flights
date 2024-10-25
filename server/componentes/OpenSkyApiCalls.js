


//Archivo que reune todas las llamadas a la Api de OpenSky

const root = `https://opensky-network.org/api`

export async function recuperarVuelos() {
    console.log('Llamada a recuperar vuelos de Open Sky')
    /* 
        TO DO: guardar la cabezera del limit rate para evitar un 429
        y/o detectar error 429
    */

    var url = root + `/states/all`

    var data = await fetch(url)
    var correctJson = await data.json()
    return correctJson
}

export function vueloAleatorio(vuelos) {
    console.log('Llamada a recuperar un vuelo aleatorio')
    var max = vuelos.states.length
    var randomIndex = Math.floor(Math.random() * max)
    return vuelos.states[randomIndex]
}

export async function recuperarPath(vuelo) {
    var url = root + `/tracks/all?icao24=${vuelo[0]}&time=0`

    var data = await fetch(url)
    var correctJson = await data.json()
    vuelo[vuelo.length] = correctJson.path
    return vuelo
}