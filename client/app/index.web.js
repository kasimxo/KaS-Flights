import { View, Text, Pressable, StyleSheet } from 'react-native'
import { vueloAleatorioGet } from '../api/api.js'
import { useEffect, useState } from 'react'

export default function index() {

    const [vuelo, setVuelo] = useState()

    useEffect(() => { recuperarVuelo() }, [])

    async function recuperarVuelo() {
        var vueloRand = await vueloAleatorioGet()
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