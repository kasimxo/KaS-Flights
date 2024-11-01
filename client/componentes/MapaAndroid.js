import MapView from 'react-native-maps'
import { useContext, useEffect, useState } from 'react'
import { VueloContexto } from '../app/_layout'
import { View } from 'react-native'


export default function MapaAndroid() {
    const { vuelo, setVuelo } = useContext(VueloContexto)

    const [track, setTrack] = useState([])
    const [area, setArea] = useState()

    useEffect(() => {

    }, [])

    function getInitialState() {
        return {
            region: {
                latitude: vuelo.latitude,
                longitude: vuelo.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    function onRegionChange(region) {
        this.setState({ region });
    }

    return (
        <View
            style={{ width: 200, height: 400 }}
        >
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: vuelo !== undefined ? vuelo.latitude : 0,
                    longitude: vuelo !== undefined ? vuelo.longitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
}