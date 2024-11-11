import 'dotenv/config'

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default {
    android: {
        config: {
            googleMaps: {
                apiKey: apiKey,
            }
        }
    },
    extra: {
        eas: {
            projectId: "f012c748-f3be-4d1c-872c-edcd68cdfe90"
        }
    }
}