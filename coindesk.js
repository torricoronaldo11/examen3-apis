import { PriceModel } from "../models.js";
export async function fetchBTC() {
    const r = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    if (!r.ok) throw new Error("coindesk error");
    const j = await r.json();
    return new PriceModel({ timeUpdated: j.time.updated, btcUSD: j.bpi.USD.rate });
}