// services/catService.js

// Esta función obtiene una imagen aleatoria de un gato desde la API pública
export async function fetchCat() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error("Error al obtener la imagen del gato");
        }

        const data = await response.json();
        // Devuelve la URL de la imagen del gato
        return data[0].url;
    } catch (error) {
        console.error("Error en fetchCat:", error);
        return null;
    }
}