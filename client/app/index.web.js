import { View, Text, Pressable, StyleSheet } from 'react-native'
import { vueloAleatorioGet } from '../api/api.js'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import * as leafletcss from 'leaflet/dist/leaflet.css'

export default function index() {

    const [vuelo, setVuelo] = useState()

    useEffect(() => { recuperarVuelo() }, [])


    async function recuperarVuelo() {

        var vueloRand = await vueloAleatorioGet()
        if (vueloRand === undefined) {
            console.log('No se ha recuperado un vuelo')
            return
        }
        setVuelo(vueloRand)
        console.log('Hemos seteado el vuelo: ', vueloRand)

    }

    return (
        <View style={styles.container}>
            <Text>Identificador: {vuelo !== undefined ? vuelo[0] : ''}</Text>
            <Text>País de origen: {vuelo !== undefined ? vuelo[2] : ''}</Text>
            <Text>Latitud: {vuelo !== undefined ? vuelo[5] : ''}</Text>
            <Text>Longitud: {vuelo !== undefined ? vuelo[6] : ''}</Text>
            <Text>Altitud: {vuelo !== undefined ? vuelo[13] : ''}</Text>
            <MapContainer style={{ height: '70vh', width: '70%' }} center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        ¡Hola desde React Leaflet!
                    </Popup>
                </Marker>
            </MapContainer>
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