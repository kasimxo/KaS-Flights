import 'dotenv/config'

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

export default {
    expo: {

        name: "kas-flight",
        scheme: "kas-flight",
        slug: "kas-flight-client",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            permissions: [
                "INTERNET",
                "ACCESS_COARSE_LOCATION",
                "ACCESS_FINE_LOCATION"
            ],
            config: {
                googleMaps: {
                    apiKey: apiKey,
                }
            },
            package: "com.kasimxo.kasflight"
        },
        web: {
            favicon: "./assets/favicon.png",
            bundler: "metro"
        },
        plugins: [
            "expo-router"
        ],
        extra: {
            eas: {
                projectId: "f012c748-f3be-4d1c-872c-edcd68cdfe90"
            }
        }
    }
}

