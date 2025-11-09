export async function fetchCat()


{
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error("Error al obtener la imagen del gato");
        }

        const data = await response.json();

        return data[0].url;
    } catch (error) {
        console.error("Error en fetchCat:", error);
        return null;
    }
}