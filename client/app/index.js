import { View, Text, Pressable } from 'react-native'

export default function index() {
    return (
        <View>
            <Text>Soy el index</Text>
            <Pressable>
                <Text>Nuevo vuelo aleatorio</Text>
            </Pressable>
        </View>
    )
}