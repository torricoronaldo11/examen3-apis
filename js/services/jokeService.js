// services/jokeService.js

// Esta función obtiene un chiste aleatorio de la API de Chuck Norris
export async function fetchJoke() {
    try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) {
            throw new Error("Error al obtener el chiste");
        }

        const data = await response.json();
        // Devuelve solo el texto del chiste
        return data.value;
    } catch (error) {
        console.error("Error en fetchJoke:", error);
        return "No se pudo obtener el chiste 😅";
    }
}