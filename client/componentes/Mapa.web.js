
import { useEffect, useState, useContext, Image } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap, Tooltip } from 'react-leaflet'
import * as leafletcss from 'leaflet/dist/leaflet.css'
import { VueloContexto } from '../app/_layout.web';
import { StyleSheet, Text } from 'react-native';
import L from 'leaflet'



export default function Mapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)


    useEffect(() => {
        console.log('useEffect')
        if (vuelo !== undefined && vuelo.time_position < vuelo.path[vuelo.path.length - 1][0]) {
            console.log('Caso A')
            setLat(vuelo.path[vuelo.path.length - 1][1])
            setLong(vuelo.path[vuelo.path.length - 1][2])
        } else if (vuelo !== undefined) {
            console.log('caso B')
            setLat(vuelo.latitude)
            setLong(vuelo.longitude)
        }
    }, [vuelo])

    const obj = {
        uri: 'https://cdn-icons-png.flaticon.com/256/7893/7893979.png',
    }

    const myIcon = new L.Icon({
        iconUrl: obj.uri,
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
    })
    return (
        <MapContainer style={estiloMapa.mapa} center={[0, 0]} zoom={10}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MoverMapa />
            <Marker
                position={[lat, long]}
                icon={myIcon}
            >
                {
                    vuelo !== undefined && lat !== 0 && long !== 0 ?
                        <Tooltip
                            permanent={true}
                            offset={[30, -25]}
                            interactive={false}
                            content={`
                                Identificador: ${vuelo.id}<br/>
                                Latitud: ${lat}<br/>
                                Longitud: ${long}<br/>
                                Altitud: ${vuelo.baro_altitude}
                            `}
                        >
                        </Tooltip>
                        : ''
                }
            </Marker>
        </MapContainer >
    )
}

const estiloMapa = StyleSheet.create({
    mapa: {
        width: '100vw',
        height: '100vh',
    }
})


function MoverMapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)
    const [track, setTrack] = useState([])

    const map = useMap()

    useEffect(() => {
        map.panTo(vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [0, 0])
        if (vuelo !== undefined) { updateTrack(vuelo.path) }
        console.log('useEffect')
    }, [vuelo])


    function updateTrack(path) {
        let camino = []
        console.log('Debug:', path)
        path.forEach((position) => {
            if (position[1] !== null && position[2] !== null) {
                camino.push([position[1], position[2]])
            }
        });

        if (vuelo.time_position > vuelo.path[vuelo.path.length - 1][0]) {
            camino.push({ latitude: vuelo.latitude, longitude: vuelo.longitude })
            console.log('Caso especial')
        }

        setTrack(camino)

    }
    return (
        <Polyline pathOptions={{ color: 'lime' }} positions={track} />
    )
}