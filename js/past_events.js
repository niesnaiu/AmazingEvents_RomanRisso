
import { createCards, createMenuCheckbox, filtroChecks, filtroBuscar} from "./functions.js"

async function obtieneJson(){
  await fetch('./assets/amazing.json')
      .then(response => response.json())
      .then(data =>{
        const dataEvents = data.events;
        const listaChk = document.getElementById('checkbox-menu');
        const cuadroBusc = document.getElementById('buscador-txb');
        const catsFilros = [... new Set(dataEvents.map(categorie => categorie.category))];
        const currentDate  = data.currentDate;

      createMenuCheckbox(catsFilros, listaChk);
      createCards(-1,dataEvents, currentDate);

      listaChk.addEventListener("change", () => {
        let buscar = cuadroBusc.value.toLowerCase();  
        let filtrado = filtroBuscar(buscar, dataEvents);
        let res = filtroChecks(filtrado);
        createCards(-1,res, currentDate);
  
    });
      cuadroBusc.addEventListener('keyup', (e) => {
        let filt = filtroChecks(dataEvents);
        let buscar = cuadroBusc.value.toLowerCase();
        let filtrado= filtroBuscar(buscar, filt);  
        let res = filtroChecks(filtrado);
        createCards(-1,res, currentDate)
 
    }); 
}).catch(err => console.error(err))
}obtieneJson()