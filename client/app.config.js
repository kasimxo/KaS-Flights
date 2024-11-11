import 'dotenv/config'

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

export default {
    expo: {
        android: {
            config: {
                googleMaps: {
                    apiKey: apiKey,
                }
            }
        },
        name: "kas-flight",
        slug: "kas-flight-client",
        extra: {
            eas: {
                projectId: "f012c748-f3be-4d1c-872c-edcd68cdfe90"
            }
        }
    }
}