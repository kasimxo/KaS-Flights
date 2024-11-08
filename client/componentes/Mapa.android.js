import MapView, { Marker, Polyline } from 'react-native-maps'
import { useContext, useEffect, useState } from 'react'
import { VueloContexto } from '../app/_layout.android'
import { View, Image, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Dimensions } from 'react-native'


export default function Mapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)

    const [track, setTrack] = useState([])
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [rotationDegrees, setRotationDegrees] = useState(0)

    useEffect(() => {
        if (vuelo === undefined) { return }
        let camino = []
        vuelo.path.forEach((position) => {
            camino.push({ latitude: position[1], longitude: position[2] })
        });

        if (vuelo.time_position > vuelo.path[vuelo.path.length - 1][0]) {
            camino.push({ latitude: vuelo.latitude, longitude: vuelo.longitude })
            setLat(vuelo.latitude)
            setLong(vuelo.longitude)
        } else {
            setLat(vuelo.path[vuelo.path.length - 1][1])
            setLong(vuelo.path[vuelo.path.length - 1][2])
        }

        setTrack(camino)

        // Calcular rotation degrees = angulo entre vuelo.path[penúltimo] y vuelo.path[último]
        let secondToLast = vuelo.path[vuelo.path.length - 2]
        let Last = vuelo.path[vuelo.path.length - 1]
        let diffLat = secondToLast[1] - Last[1]
        let diffLong = secondToLast[2] - Last[2]
        let angle = Math.atan2(Math.abs(diffLat), Math.abs(diffLong)) * 180 / Math.PI
        if (diffLat > 0 && diffLong > 0) {
            setRotationDegrees(angle + 180)
        } else if (diffLat < 0 && diffLong > 0) {
            setRotationDegrees(angle + 270)
        } else if (diffLat < 0 && diffLong < 0) {
            setRotationDegrees(angle)
        } else if (diffLat > 0 && diffLong < 0) {
            setRotationDegrees(angle + 90)
        }
        console.log(angle, diffLat, diffLong)

    }, [vuelo])

    return (
        <View
            style={estilosMapa.mapa}
        >
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: lat, longitude: long }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    icon={require('./../assets/marker.png')}
                    rotation={rotationDegrees}
                >
                    {/*

                        <View>
                        <Image
                            source={require('./../assets/modo-avion.png')}
                            style={{ width: 26, height: 26, transform: [{ rotate: rotationDegrees + 'deg' }] }}
                            />
                    </View>
                        */}
                </Marker>
                <Polyline
                    coordinates={track}
                />
            </MapView>
        </View >
    )
}

const estilosMapa = StyleSheet.create({
    mapa: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }

})