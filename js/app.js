import { fetchRandomUser } from "./services/userService.js";
import { fetchBTC } from "./services/btcService.js";
import { fetchAgify } from "./services/agifyService.js";
import { fetchGenderize } from "./services/genderizeService.js";
import { fetchNationalize } from "./services/nationalizeService.js";
import { fetchDog } from "./services/dogService.js";
import { fetchJoke } from "./services/jokeService.js";
import { fetchCat } from "./services/catService.js";


import { UserModel, NameEstimate, SimpleFact, JokeModel, PriceModel } from "./models.js";

console.log("✅ app.js cargado correctamente");



// ============================
// VARIABLES GLOBALES
// ============================
let pasoActual = 1;
const PASOS_TOTAL = 8;

const cardBody = document.getElementById("card-body");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

// ============================
// FUNCIÓN PRINCIPAL
// ============================
async function renderPaso(n) {
    try {
        cardBody.innerHTML = "";

        // Paso 1 — Cuenta
        if (n === 1) {
            cardBody.innerHTML = `
        <label>Correo electrónico:
          <input id="inp_email" type="email" placeholder="correo@ejemplo.com">
        </label>
        <label>Contraseña:
          <input id="inp_pass" type="password" placeholder="Mínimo 6 caracteres">
        </label>
        <label>Confirmar contraseña:
          <input id="inp_confirm" type="password" placeholder="Repite la contraseña">
        </label>
      `;
        }

        // Paso 2 — Estimar edad (Agify)
        else if (n === 2) {
            cardBody.innerHTML = `
        <label>Nombre:
          <input id="inp_name_age" type="text" placeholder="Ej: Carlos">
        </label>
        <button id="btn_age">Consultar edad</button>
        <div id="res_age"></div>
      `;
            document.getElementById("btn_age").addEventListener("click", async() => {
                const name = document.getElementById("inp_name_age").value.trim();
                if (!name) return alert("Ingresa un nombre");
                const r = await fetchAgify(name);
                document.getElementById("res_age").innerHTML = `<p>Edad estimada: ${r.age || "Sin datos"}</p>`;
            });
        }

        // Paso 3 — Género
        else if (n === 3) {
            cardBody.innerHTML = `
        <label>Nombre:
          <input id="inp_name_gen" type="text" placeholder="Ej: Andrea">
        </label>
        <button id="btn_gen">Consultar género</button>
        <div id="res_gen"></div>
      `;
            document.getElementById("btn_gen").addEventListener("click", async() => {
                const name = document.getElementById("inp_name_gen").value.trim();
                if (!name) return alert("Ingresa un nombre");
                const r = await fetchGenderize(name);
                document.getElementById("res_gen").innerHTML = `<p>Género: ${r.gender || "Sin datos"}</p>`;
            });
        }

        // Paso 4 — Nacionalidad
        else if (n === 4) {
            cardBody.innerHTML = `
        <label>Nombre:
          <input id="inp_name_nat" type="text" placeholder="Ej: Sofía">
        </label>
        <button id="btn_nat">Consultar nacionalidad</button>
        <div id="res_nat"></div>
      `;
            document.getElementById("btn_nat").addEventListener("click", async() => {
                const name = document.getElementById("inp_name_nat").value.trim();
                if (!name) return alert("Ingresa un nombre");
                const r = await fetchNationalize(name);
                const countries =
                    (r.country || [])
                    .slice(0, 3)
                    .map(c => `${c.country_id} (${Math.round(c.probability * 100)}%)`)
                    .join(", ") || "Sin datos";
                document.getElementById("res_nat").innerHTML = `<p>Posibles países: ${countries}</p>`;
            });
        }

        // Paso 5 — Chuck Norris
        else if (n === 5) {
            const joke = await fetchChuck();
            cardBody.innerHTML = `<p>${joke}</p>`;
        }

        // Paso 6 — Cat Fact
        else if (n === 6) {
            const fact = await fetchCatFact();
            cardBody.innerHTML = `<p>${fact}</p>`;
        }

        // Paso 7 — Dog
        else if (n === 7) {
            const img = await fetchDog();
            cardBody.innerHTML = `<img src="${img}" width="250" style="border-radius:10px;">`;
        }

        // Paso 8 — Usuario Aleatorio
        else if (n === 8) {
            const u = await fetchRandomUser();
            cardBody.innerHTML = `
        <p>Usuario: ${u.name} (${u.email})</p>
        <img src="${u.picture}" width="100" style="border-radius:50%;">
      `;
        }

    } catch (e) {
        cardBody.innerHTML = `<p style="color:red">Error: ${e.message}</p>`;
        console.error(e);
    }
}

// ============================
// BOTONES
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const cardBody = document.getElementById("card-body");

    let pasoActual = 1;
    const PASOS_TOTAL = 8;

    // Tus funciones y eventos:
    btnNext.addEventListener("click", async() => {
        if (pasoActual === 1) {
            const email = document.getElementById("inp_email").value.trim();
            const pass = document.getElementById("inp_pass").value;
            const confirm = document.getElementById("inp_confirm").value;

            if (!email) return alert("Ingresa un correo electrónico");
            if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(email)) return alert("Correo inválido");
            if (pass.length < 6) return alert("Contraseña muy corta");
            if (pass !== confirm) return alert("Las contraseñas no coinciden");
        }

        if (pasoActual < PASOS_TOTAL) {
            pasoActual++;
            renderPaso(pasoActual);
        }
    });

    btnPrev.addEventListener("click", () => {
        if (pasoActual > 1) {
            pasoActual--;
            renderPaso(pasoActual);
        }
    });

    renderPaso(pasoActual);
});