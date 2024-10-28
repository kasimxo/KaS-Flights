import { View, Text, Pressable, StyleSheet } from 'react-native'
import { vueloAleatorioGet } from '../api/api.js'
import { useEffect, useState } from 'react'
import Mapa from '../componentes/Mapa.js'

export default function index() {

    const [vuelo, setVuelo] = useState()

    useEffect(() => { recuperarVuelo() }, [])


    async function recuperarVuelo() {

        var vueloRand = await vueloAleatorioGet()
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
            <Text>Identificador: {vuelo !== undefined ? vuelo.id : ''}</Text>
            <Text>País de origen: {vuelo !== undefined ? vuelo.origen : ''}</Text>
            <Text>Latitud: {vuelo !== undefined ? vuelo.latitude : ''}</Text>
            <Text>Longitud: {vuelo !== undefined ? vuelo.longitude : ''}</Text>
            <Text>Altitud: {vuelo !== undefined ? vuelo.baro_altitude : ''}</Text>
            <Mapa vuelo={vuelo} />
            <Pressable
                style={styles.boton}
                onPress={recuperarVuelo}
            >
                <Text style={styles.textoBoton}>Nuevo vuelo aleatorio</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 100,
    },
    textoBoton: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    boton: {
        padding: 25,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81cbde',
        borderRadius: 25
    }
})