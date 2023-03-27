import { ordenaArray,agregar_estadistica,procesaDatos,separaFuturoPasado} from "./functions.js"
async function obtieneJson(){
    await fetch('./assets/amazing.json')
        .then(response => response.json())
        .then(data =>{
         let cap = ordenaArray(data.events)
         agregar_estadistica(cap)
         procesaDatos(separaFuturoPasado(data.events,data.currentDate))

         
}).catch(err => console.error(err))
}obtieneJson()
