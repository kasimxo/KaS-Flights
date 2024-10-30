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
    /*
    let vuelosPath = path.join(process.cwd(), 'server', 'vuelos.json');
    console.log(fs.readdirSync(process.cwd() + '/server'))
    let vuelosRaw = fs.readFileSync(vuelosPath, { encoding: 'utf8' })
    */
    console.log('Vamos a leer el archivo:', json)
    let vuelos = JSON.parse(json)
    console.log('Recuperados vuelos del archivo: ', vuelos.states.length)
    return vuelos
}