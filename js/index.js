import data from "./amazing.js";

let tarjetasgral = [];
function catalogo(events){
    for (let evento of events) {
        tarjetasgral.push(evento);
    }
    return tarjetasgral;
}

catalogo(data.events, data.currentDate);

const tarjetitas = document.getElementById("tarjetitas")
const particion = document.createDocumentFragment();

tarjetasgral.forEach((evento) => {
    const sectortarjeta = document.createElement("div");
    sectortarjeta.className ="tarjetita mt-3 card shadow-sm col-12 col-sm-6 col-lg-3";
    sectortarjeta.innerHTML = `<img src="${evento.image}" class="card-img-top object-fit-cover" alt="${evento.category}">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p> 
    </div>
    <div class="card-footer d-flex flex-wrap justify-content-between">
      <p>Price: ${evento.price}</p>
      <a href="./details/details.html" class="btn btn-primary btn-sm">Details</a>
    </div>
  `;
  particion.appendChild(sectortarjeta)
})
tarjetitas.appendChild(particion)