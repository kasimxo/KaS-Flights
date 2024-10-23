import { View, Text } from 'react-native'
import { Slot } from 'expo-router'

export default function Layout() {
    return (
        <View>
            <Text>Hola, soy una app-web.</Text>
            <Slot />
        </View>
    )
}