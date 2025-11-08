// servicio randomuser
import { UserModel } from "../models.js";
export async function fetchRandomUser() {
    const r = await fetch("https://randomuser.me/api/");
    if (!r.ok) throw new Error("randomuser error");
    const j = await r.json();
    const u = j.results[0];
    return new UserModel({ name: `${u.name.first} ${u.name.last}`, email: u.email, phone: u.phone, picture: u.picture.large });
}