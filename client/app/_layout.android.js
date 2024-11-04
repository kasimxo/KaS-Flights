import { View, Text, StyleSheet } from 'react-native'
import { Slot } from 'expo-router'
import Constants from 'expo-constants'
import { createContext, useState } from 'react'

export const VueloContexto = createContext()
export const VueloProvider = ({ children }) => {
    const [vuelo, setVuelo] = useState()
    const [vuelos, setVuelos] = useState()
    return (
        < VueloContexto.Provider
            value={
                {
                    vuelo, setVuelo,
                    vuelos, setVuelos
                }
            } >
            {children}
        </VueloContexto.Provider >
    )
}

export default function Layout() {

    const estilosBasicos = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight
        }
    })

    return (
        <View style={estilosBasicos.container}>
            <VueloProvider>
                <Slot />
            </VueloProvider>
        </View>
    )
}