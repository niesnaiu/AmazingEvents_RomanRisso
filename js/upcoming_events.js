
import { createCards, createMenuCheckbox, filtroChecks, filtroBuscar} from "./functions.js"

async function obtieneJson(){
  await fetch('./assets/amazing.json')
      .then(response => response.json())
      .then(data =>{

        const dataEvents = data.events;
        const currentDate  = data.currentDate;
        const listaChk = document.getElementById('checkbox-menu');
        const cuadroBusc = document.getElementById('buscador-txb');
        const catsFilros = [... new Set(dataEvents.map(categorie => categorie.category))];


        createMenuCheckbox(catsFilros, listaChk);
        createCards(2,dataEvents, currentDate);

        listaChk.addEventListener("change", () => {
          let buscar = cuadroBusc.value.toLowerCase();  
          let filtrado = filtroBuscar(buscar, dataEvents);
          let res = filtroChecks(filtrado);
        createCards(2,res, currentDate);
  
        });
        cuadroBusc.addEventListener('keyup', (e) => {
          let filt = filtroChecks(dataEvents);
          let buscar = cuadroBusc.value.toLowerCase();
          let filtrado= filtroBuscar(buscar, filt);  
          let res = filtroChecks(filtrado);
          createCards(2,res, currentDate)
        }); 
}).catch(err => console.error(err))
}obtieneJson()