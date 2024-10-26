//Archivo que gestiona todas las llamadas al servidor

export async function vueloAleatorioGet() {
    var url = `http://localhost:3000`

    var data = await fetch(url)

    if (data.status !== 200) {
        console.error('Error con la llamada a pedir un vuelo aleatorio. Servicio no disponible')
        return
    }

    var respuesta = data.json()
    console.log(respuesta)
    return respuesta
}