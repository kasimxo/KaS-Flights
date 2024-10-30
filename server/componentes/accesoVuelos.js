import fs from 'node:fs'

// guardamos la información de los vuelos en un archivo.json
export function guardarVuelos(vuelos) {
    let vuelosString = JSON.stringify(vuelos)
    fs.writeFileSync('./vuelos.json', vuelosString, { encoding: 'utf8' })
}

// leemos la información de los vuelos del archivo.json
export function leerVuelos() {
    let vuelosRaw = fs.readFileSync('./vuelos.json', { encoding: 'utf8' })
    let vuelos = JSON.parse(vuelosRaw)
    console.log('Recuperados vuelos del archivo: ', vuelos.states.length)
    return vuelos
}