import { PriceModel } from "../models.js";
export async function fetchBTC() {
    const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    if (!res.ok) throw new Error("Error al obtener precio BTC");
    const json = await res.json();
    return new PriceModel({
        timeUpdated: json.time.updated,
        btcUSD: json.bpi.USD.rate
    });
}