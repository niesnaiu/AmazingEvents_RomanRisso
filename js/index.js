import data from "./amazing.js";
import { createMenuCheckbox, createCards, filtroChecks, filtroBuscar } from "./functions.js"


const dataEvents = data.events;
const listaChk = document.getElementById('checkbox-menu');
const cuadroBusc = document.getElementById('buscador-txb');
const catsFilros = [... new Set(data.events.map(categorie => categorie.category))];

const currentDate = '';
createMenuCheckbox(catsFilros, listaChk);
createCards(0,dataEvents, currentDate);

listaChk.addEventListener("change", () => {
  let buscar = cuadroBusc.value.toLowerCase();
  let filtrado = filtroBuscar(buscar, dataEvents);
  let res = filtroChecks(filtrado);
  createCards(0,res,currentDate);
});
 cuadroBusc.addEventListener('keyup', (e) => {
  let filt = filtroChecks(dataEvents);
  let buscar = cuadroBusc.value.toLowerCase();
  let filtrado= filtroBuscar(buscar, filt);
  let res = filtroChecks(filtrado);
  createCards(0,res, currentDate);
}); 