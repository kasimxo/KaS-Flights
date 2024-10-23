import express from 'express'
import cors from 'cors'
import { recuperarVuelos, vueloAleatorio } from './componentes/OpenSkyApiCalls.js'

const app = express()
const port = 3000

//Vuelos
var vuelos = undefined

//Intervalo
var intervalo = undefined

app.use(cors())

app.get('/', (req, res) => {
    var vuelo = vueloAleatorio(vuelos)
    console.log('VUELO RANDOM: ', vuelo)
    res.send(vuelo)

})

app.listen(port, () => {
    /*
    TO-DO:
    Almacenar los vuelos recuperados en un archivo para que la info se guarde entre reseteos de servidor
    */

    console.log(`Servidor iniciado en el puerto: ${port}`)
    if (vuelos === undefined) {
        vuelos = recuperarVuelos()
    }
    //600000 milisegundos -> 10 minutos
    intervalo = setInterval(recuperarVuelos, 600000)
    //console.log('VUELOS: ', vuelos)
})