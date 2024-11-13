# KaS-Flights

KaS-Flights permite la visualización de un vuelo real (utilizando la API de OpenSky Network) aleatorio. Como proyecto, recoje las principales características del desarrollo de aplicaciones multiplataforma, que son:

- Variedad de dispositivos: Con el uso de React Native y react-native-web está disponible en Android y como aplicación web. Utiliza expo-router para diferenciar los componentes y páginas en función de la plataforma cuando se requiere.
- Acceso a datos: Con llamadas a la API de OpenSky Network se recuperan datos actuales y reales. A través de un sistema de guardado local y una comprobación de la fecha y hora de este guardado local se evita un exceso innecesario de llamas a la API.
- Solución de errores: La aplicación está preparada ante los posibles errores, como que la API no esté disponible o haya algún error en los datos recibidos.

|Versión web|Versión Android|
:------------:|:------------:
![versionweb](https://github.com/user-attachments/assets/23060367-9bbf-4a5c-84af-1eff84ab3c2e) | ![androidmockupnoshadow](https://github.com/user-attachments/assets/22946914-6362-4497-bdf7-acb043676981)
[Prueba la versión web](https://ka-s-flights.vercel.app/) | [Descarga la apk para Android](https://github.com/kasimxo/KaS-Flights/releases/download/v1.0.0/application-fa3b4cf9-8f1d-49c9-83b5-d9418f65b3ca.apk)



### Tecnologías y dependencias

- React Native + Expo
- Leaflet (mapas para web)
- react-native-maps (mapas para la versión móvil)
- expo-router (navegación en la aplicación y diferenciación por plataformas)
- Vercel (hosting de la versión web)
