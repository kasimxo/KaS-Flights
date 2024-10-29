
import { useEffect, useState, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from 'react-leaflet'
import * as leafletcss from 'leaflet/dist/leaflet.css'
import { VueloContexto } from '../app/_layout.web';

export default function Mapa() {
    const { vuelo, setVuelo } = useContext(VueloContexto)

    const [track, setTrack] = useState([])


    useEffect(() => {
        //if (vuelo !== undefined) { updateTrack(vuelo.path) }

        console.log('useEffect')
    }, [vuelo])

    return (
        <MapContainer style={{ height: '70vh', width: '70%' }} center={[0, 0]} zoom={10}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {/*<UpdateMapCentre coords={vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [51.505, -0.09]} />*/}
            <MoverMapa />
            <Marker position={vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [51.505, -0.09]}>
                <Popup>
                    Identificador: {vuelo !== undefined ? vuelo.id : ''}<br />
                    País de origen: {vuelo !== undefined ? vuelo.origen : ''}<br />
                    Latitud: {vuelo !== undefined ? vuelo.latitude : ''}<br />
                    Longitud: {vuelo !== undefined ? vuelo.longitude : ''}<br />
                    Altitud: {vuelo !== undefined ? vuelo.baro_altitude : ''}<br />
                </Popup>
            </Marker>

        </MapContainer>
    )

}

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