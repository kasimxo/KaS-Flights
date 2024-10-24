import express from 'express'
import cors from 'cors'
import { recuperarVuelos, vueloAleatorio } from './componentes/OpenSkyApiCalls.js'
import { guardarVuelos, leerVuelos } from './componentes/accesoVuelos.js'

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

    vuelos = leerVuelos()

    if (vuelos.time + 600 < Date.now() / 1000) {
        console.log('La información del archivo está desactualizada: ', vuelos.time, vuelos.time + 600, Date.now())
        recuperarVuelos().then((data) => {
            vuelos = data
            guardarVuelos(vuelos)
            intervalo = setInterval(recuperarVuelos, 600000)
        })
    } else {
        console.log('Cargada la información del archivo')
        let delay = (vuelos.time + 600) * 1000 - Date.now()
        console.log(`Se lanzará la recarga automática en: ${delay / 1000} s`)
        setTimeout(() => { intervalo = setInterval(recuperarVuelos, 600000) },)
    }
})