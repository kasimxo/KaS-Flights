import 'dotenv/config'

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default {
    android: {
        config: {
            googleMaps: {
                apiKey: apiKey,
            }
        }
    }
}