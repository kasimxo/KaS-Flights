import fs from 'node:fs'
import path from 'path'
import json from './../vuelos.json' with {type: "json"}


// guardamos la información de los vuelos en un archivo.json
export function guardarVuelos(vuelos) {
    let vuelosString = JSON.stringify(vuelos)
    //fs.writeFileSync('./vuelos.json', vuelosString, { encoding: 'utf8' })
}

// leemos la información de los vuelos del archivo.json
export function leerVuelos() {
    return json
}