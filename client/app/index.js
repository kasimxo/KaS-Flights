import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useEffect, useContext } from 'react'
import { VueloContexto } from './_layout.js'
import MapaAndroid from '../componentes/MapaAndroid.js'
import { recuperarPath, recuperarVuelos, vueloAleatorio } from '../api/OpenSkyApiCalls.js'

export default function index() {

    const {
        vuelo, setVuelo,
        vuelos, setVuelos
    } = useContext(VueloContexto)

    useEffect(() => {
        recuperarVuelo()
    }, [])

    async function recuperarVuelo() {
        let data = vuelos !== undefined ? vuelos : null
        if (vuelos === undefined || vuelos.time + 600 < Date.now() / 1000) {
            console.log('La información de vuelos está desactualizada')
            let vuelosJSON = await recuperarVuelos()
            data = vuelosJSON
            setVuelos(vuelosJSON)
        } else {
            console.log('Información de vuelos válida')
        }

        let vueloRand = await vueloAleatorio(data)
        vueloRand = await recuperarPath(vueloRand)
        if (vueloRand === undefined) {
            console.log('No se ha recuperado un vuelo')
            return
        }
        setVuelo({
            id: vueloRand[0],
            callsign: vueloRand[1],
            origen: vueloRand[2],
            time_position: vueloRand[3],
            last_contact: vueloRand[4],
            longitude: vueloRand[5],
            latitude: vueloRand[6],
            baro_altitude: vueloRand[7],
            on_ground: vueloRand[8],
            velocity: vueloRand[9],
            true_track: vueloRand[10],
            vertical_rate: vueloRand[11],
            sensors: vueloRand[12],
            geo_altitude: vueloRand[13],
            squawk: vueloRand[14],
            spi: vueloRand[15],
            position_source: vueloRand[16],
            category: vueloRand[17],
            path: vueloRand[18]
        })
        console.log('Hemos seteado el vuelo: ', vueloRand)
    }

    return (
        <View style={styles.container}>
            <MapaAndroid />
            <Pressable
                style={styles.boton}
                onPress={recuperarVuelo}
            >
                <Text style={{ color: 'white' }}>Nuevo vuelo aleatorio</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 25,

        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textoBoton: {

        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'white',
    },
    boton: {
        padding: 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderRadius: 25
    }
})