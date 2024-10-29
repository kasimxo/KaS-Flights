import { View, Text } from 'react-native'
import { Slot } from 'expo-router'
import { createContext, useState } from 'react'

export const VueloContexto = createContext()
export const VueloProvider = ({ children }) => {
    const [vuelo, setVuelo] = useState()
    return (
        < VueloContexto.Provider
            value={
                {
                    vuelo, setVuelo
                }
            } >
            {children}
        </VueloContexto.Provider >
    )
}

export default function Layout() {
    return (
        <View>
            <VueloProvider>
                <Slot />
            </VueloProvider>
        </View>
    )
}