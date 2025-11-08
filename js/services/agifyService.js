import { NameEstimate } from "../models.js";
export async function fetchAgify(name) {
    const r = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
    if (!r.ok) throw new Error("agify error");
    const j = await r.json();
    return new NameEstimate({ name: j.name, age: j.age });
}