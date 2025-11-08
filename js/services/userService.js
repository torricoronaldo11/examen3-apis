import { UserModel } from "../models.js";

export async function fetchRandomUser() {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error("Error al obtener usuario");
    const json = await res.json();
    const r = json.results[0];
    return new UserModel({
        name: `${r.name.first} ${r.name.last}`,
        email: r.email,
        phone: r.phone,
        picture: r.picture.large
    });
}