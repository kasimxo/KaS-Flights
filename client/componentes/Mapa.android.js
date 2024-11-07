import MapView, { Marker, Polyline } from 'react-native-maps'
import { useContext, useEffect, useState } from 'react'
import { VueloContexto } from '../app/_layout.android'
import { View, Image, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Dimensions } from 'react-native'


export default function Mapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)

    const [track, setTrack] = useState([])
    const [area, setArea] = useState()

    useEffect(() => {
        if (vuelo === undefined) { return }
        let camino = []
        vuelo.path.forEach((position) => {

            camino.push({ latitude: position[1], longitude: position[2] })
        });
        setTrack(camino)
        //{latitude: 37.8025259, longitude: -122.4351431},
    }, [vuelo])

    return (
        <View
            style={estilosMapa.mapa}
        >
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: vuelo !== undefined ? vuelo.latitude : 0,
                    longitude: vuelo !== undefined ? vuelo.longitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={vuelo !== undefined ? { latitude: vuelo.latitude, longitude: vuelo.longitude } : { latitude: 0, longitude: 0 }}
                >
                    <View>
                        <Image
                            source={require('./../assets/modo-avion.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                </Marker>
                <Polyline
                    coordinates={track}
                />
            </MapView>
        </View>
    )
}

const estilosMapa = StyleSheet.create({
    mapa: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }

})