import { createDetails } from "./functions.js"
import data from "./amazing.js";


const contenedorDetails = document.getElementById("contenedor-tarjetitas");


    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const evento = data.events.find(evento => evento.id == id)

    createDetails(evento, contenedorDetails)
