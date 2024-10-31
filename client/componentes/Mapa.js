
import { useEffect, useState, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from 'react-leaflet'
import * as leafletcss from 'leaflet/dist/leaflet.css'
import { VueloContexto } from '../app/_layout.web';
import { StyleSheet } from 'react-native';
import L from 'leaflet'

import marker from './../assets/favicon.png';


export default function Mapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)

    const [track, setTrack] = useState([])


    useEffect(() => {
        //if (vuelo !== undefined) { updateTrack(vuelo.path) }

        console.log('useEffect')
    }, [vuelo])

    const myIcon = new L.Icon({
        iconUrl: './../assets/modo-avion.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25, 60], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    return (
        <MapContainer style={estiloMapa.mapa} center={[0, 0]} zoom={10}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MoverMapa />
            <Marker
                position={vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [51.505, -0.09]}
                icon={myIcon}
            >
                <Popup>
                    Identificador: {vuelo !== undefined ? vuelo.id : ''}<br />
                    {/*País de origen: {vuelo !== undefined ? vuelo.origen : ''}<br />*/}
                    Latitud: {vuelo !== undefined ? vuelo.latitude : ''}<br />
                    Longitud: {vuelo !== undefined ? vuelo.longitude : ''}<br />
                    Altitud: {vuelo !== undefined ? vuelo.baro_altitude : ''}<br />
                </Popup>
            </Marker>

        </MapContainer >
    )

}

const estiloMapa = StyleSheet.create({
    mapa: {
        width: '80vw',
        height: '80vh',
        borderRadius: 25,
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

            camino.push([position[1], position[2]])
        });
        setTrack(camino)

    }
    return (
        <Polyline pathOptions={{ color: 'lime' }} positions={track} />
    )
}