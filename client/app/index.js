import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function index() {
    return (
        <View>
            <Text>Soy el index</Text>
            <Pressable >
                <Text>Nuevo vuelo aleatorio</Text>
            </Pressable>
        </View>
    )
}

const styles = new StyleSheet({
    boton: {
        padding: 25,
    }
})