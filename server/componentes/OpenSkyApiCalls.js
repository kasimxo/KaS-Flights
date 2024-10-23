import fs from 'node:fs'


//Archivo que reune todas las llamadas a la Api de OpenSky

export function recuperarVuelos() {
    console.log('Llamada a recuperar vuelos de Open Sky')

    var data = fs.readFileSync('./vuelos.txt', { encoding: 'utf8' })

    var correctJson = JSON.parse(data)
    return correctJson.states
}

export function vueloAleatorio(vuelos) {

    var max = vuelos.length
    var randomIndex = Math.floor(Math.random() * max)
    return vuelos[randomIndex]
}