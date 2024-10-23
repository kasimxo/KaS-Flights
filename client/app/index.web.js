import { View, Text, Pressable } from 'react-native'
import { vueloAleatorioGet } from '../api/api.js'
import { useState } from 'react'

export default function index() {

    const [vuelo, setVuelo] = useState()

    async function recuperarVuelo() {
        var vueloRand = await vueloAleatorioGet()
        setVuelo(vueloRand)
        console.log('Hemos seteado el vuelo: ', vueloRand)
    }

    return (
        <View>
            <Text>Soy el index</Text>
            <Text>Identificador: {vuelo !== undefined ? vuelo[0] : ''}</Text>
            <Text>País de origen: {vuelo !== undefined ? vuelo[2] : ''}</Text>
            <Text>Latitud: {vuelo !== undefined ? vuelo[5] : ''}</Text>
            <Text>Longitud: {vuelo !== undefined ? vuelo[6] : ''}</Text>
            <Text>Altitud: {vuelo !== undefined ? vuelo[13] : ''}</Text>
            <Pressable
                onPress={recuperarVuelo}
            >
                <Text>Nuevo vuelo aleatorio</Text>
            </Pressable>
        </View>
    )
}