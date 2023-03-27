import { createDetails } from "./functions.js"

const contenedorDetails = document.getElementById("contenedor-tarjetitas");
const params = new URLSearchParams(location.search)
const id = params.get("id")
async function obtieneJson(){
    await fetch('./assets/amazing.json')
        .then(response => response.json())
        .then(data =>{
            const evento = data.events.find(evento => evento._id == id)
            createDetails(evento, contenedorDetails);
        }).catch(err => console.error(err))
}
obtieneJson()
