
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from 'react-leaflet'
import * as leafletcss from 'leaflet/dist/leaflet.css'

export default function Mapa(props) {
    const vuelo = props.vuelo

    const [track, setTrack] = useState([])

    function updateTrack(path) {
        let camino = []
        console.log('Debug:', path)
        path.forEach((position) => {

            camino.push([position[1], position[2]])
        });
        setTrack(camino)
    }

    function UpdateMapCentre(props) {
        const map = useMap();
        map.panTo(props.coords);
        map.setZoom(4)

        if (vuelo !== undefined) { updateTrack(vuelo.path) }

        return null;
    }
    return (
        <MapContainer style={{ height: '70vh', width: '70%' }} center={[0, 0]} zoom={10}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <UpdateMapCentre coords={vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [51.505, -0.09]} />
            <Marker position={vuelo !== undefined ? [vuelo.latitude, vuelo.longitude] : [51.505, -0.09]}>
                <Popup>
                    ¡Hola desde React Leaflet!
                </Popup>
            </Marker>
            <Polyline pathOptions={{ color: 'lime' }} positions={track} />
        </MapContainer>
    )

}