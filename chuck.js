import { JokeModel } from "../models.js";
export async function fetchChuck() {
    const r = await fetch("https://api.chucknorris.io/jokes/random");
    if (!r.ok) throw new Error("chuck error");
    const j = await r.json();
    return new JokeModel({ id: j.id, value: j.value });
}