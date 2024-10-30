import express from 'express'
import cors from 'cors'
import { recuperarVuelos, vueloAleatorio, recuperarPath } from './componentes/OpenSkyApiCalls.js'
import { guardarVuelos, leerVuelos } from './componentes/accesoVuelos.js'

const app = express()
const port = 3000

//Vuelos
let vuelos = undefined
//Vuelo: El vuelo aleatorio escogido de todos los vuelos
let vuelo = undefined

//Intervalo
let intervalo = undefined

app.use(cors())
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    //console.log(req)
    if (vuelos !== undefined && vuelos.states === null) {
        res.sendStatus(503)
        res.end()
        return
    }
    next()
})

app.get('/', (req, res) => {
    if (vuelos === undefined) {
        res.send('Lista de vuelos no disponible')
    }
    if (vuelo !== undefined) {
        res.send(vuelo)
        vuelo = undefined
        let vueloTemp = vueloAleatorio(vuelos)
        recuperarPath(vueloTemp).then((vueloT) => { vuelo = vueloT })
            .catch((error) => { console.log('Hemos detectado un error 1') })
    } else {
        let vueloTemp = vueloAleatorio(vuelos)
        recuperarPath(vueloTemp).then((vueloT) => { res.send(vueloT) })
            .catch((error) => { console.log('Hemos detectado un error 2') })
        vueloTemp = vueloAleatorio(vuelos)
        recuperarPath(vueloTemp).then((vueloT) => { vuelo = vueloT })
            .catch((error) => { console.log('Hemos detectado un error 3') })
    }
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
            let vueloTemp = vueloAleatorio(vuelos)
            intervalo = setInterval(recuperarVuelos, 600000)
            recuperarPath(vueloTemp).then((vueloT) => { vuelo = vueloT }) //Cargamos automáticamente un vuelo
        }).catch((error) => { console.log('Hemos detectado un error con la api') })
    } else {
        console.log('Cargada la información del archivo')
        let delay = (vuelos.time + 600) * 1000 - Date.now()
        console.log(`Se lanzará la recarga automática en: ${delay / 1000} s`)
        setTimeout(() => { intervalo = setInterval(recuperarVuelos, 600000) },)
        if (vuelos.states !== null) {
            let vueloTemp = vueloAleatorio(vuelos)
            recuperarPath(vueloTemp).then((vueloT) => { vuelo = vueloT }) //Cargamos automáticamente un vuelo
        } else {
            console.error('Fallo con la API de OpenSky, vuelos === null')
        }

    }
})