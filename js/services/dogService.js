export async function fetchDog() {
    const r = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!r.ok) throw new Error("dog error");
    const j = await r.json();
    return j.message;
}