// services/jokeService.js


export async function fetchJoke() {
    try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) {
            throw new Error("Error al obtener el chiste");
        }

        const data = await response.json();

        return data.value;
    } catch (error) {
        console.error("Error en fetchJoke:", error);
        return "No se pudo obtener el chiste 😅";
    }
}