


//Archivo que gestiona todas las llamadas al servidor

export async function vueloAleatorioGet() {
    var url = `http://localhost:3000`

    var data = await fetch(url)
    var respuesta = data.json()
    return respuesta
}