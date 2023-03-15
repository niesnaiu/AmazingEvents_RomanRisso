import data from "./amazing.js";
import { createMenuCheckbox, createCards, filtroChecks, filtroBuscar } from "./functions.js"


const dataEvents = data.events;
const listaChk = document.getElementById('checkbox-menu');
const cuadroBusc = document.getElementById('buscador-txb');
const catsFilros = [... new Set(dataEvents.map(categorie => categorie.category))];
const contenedorTarjetas = document.getElementById('contenedor-tarjetitas');
createMenuCheckbox(catsFilros, listaChk);
createCards(dataEvents, contenedorTarjetas);
listaChk.addEventListener("change", () => {
  let buscar = cuadroBusc.value.toLowerCase();
  let filtrado = filtroBuscar(buscar, dataEvents);
  let res = filtroChecks(filtrado);
  createCards(res);
});
 cuadroBusc.addEventListener('keyup', (e) => {
  let aux = filtroChecks(dataEvents);
  let buscar = cuadroBusc.value.toLowerCase();
  let filtrado= filtroBuscar(buscar, aux);
  let res = filtroChecks(filtrado);
  createCards(res)
}); 