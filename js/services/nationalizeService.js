import { NameEstimate } from "../models.js";
export async function fetchNationalize(name) {
    const r = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`);
    if (!r.ok) throw new Error("nationalize error");
    const j = await r.json();
    return new NameEstimate({ name: j.name, country: j.country });
}