import { View, Text } from 'react-native'
import { Slot } from 'expo-router'
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
    return (
        <View style={{ flex: 1 }}>
            <VueloProvider>
                <Slot />
            </VueloProvider>
        </View>
    )
}