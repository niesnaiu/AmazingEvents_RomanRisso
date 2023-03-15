export function createMenuCheckbox(lista_cat, chk ) {
    let lista_chk = "";
    lista_cat.forEach(element => {
        lista_chk += `<div class="form-check form-check-inline"> 
        <input class="form-check-input" type="checkbox" name="cat1" id="cat1" value="${element}">
        <label class="form-check-label" for="cat1">${element}</label>
      </div>`;
    });
  chk.innerHTML = lista_chk;
}

export function createCards (cards) {
    const cardsContainer = document.getElementById("tarjetitas");
    let card = "";
    for (let evento of cards) {
    card += `<div class="card" style="width: 18rem;">
    <img src="${evento.image}" class="card-img-top p-2" alt="${evento.name}.img">
    <div class="card-body">
    <h5> ${evento.name} </h5>
    <p class="card-text" id="textoParrafo"> ${evento.description} </p>
    <div id="boton1">
    <p> Price: $ ${evento.price} </p>
    <a href="./details.html?id=${evento.id}&nombre=${evento.name}" class="btn btn-primary" id="move">Details</a>
    </div>
    </div>
</div>`  
         /* card += `<div class="card mt-3 card shadow-sm col-12 col-sm-6 col-lg-3">
        <img src="${evento.image}" class="card-img-top object-fit-cover" alt="${evento.category}">
        <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p> 
        </div>
        <div class="card-footer d-flex flex-wrap justify-content-between">
          <p>Price: ${evento.price}</p>
          <a href="./details/details.html" class="btn btn-primary btn-sm">Details</a>
        </div>` */
    }
    cardsContainer.innerHTML = card;

}

export function filtroChecks(evento) {
    let cambCheck = [...document.querySelectorAll("input[type='checkbox']:checked"),].map(check => check.value);
    if (cambCheck.length === 0) {
        return evento;
    }
    return evento.filter((filtroCheck) => cambCheck.includes(filtroCheck.category));
}
export function filtroBuscar(buscar, dataEvents) {
    let busqueda = dataEvents.filter(buscadorInterno => buscadorInterno.name.toLowerCase().includes(buscar))
    if (busqueda.length === 0) {
        return

    }
    return busqueda;
}



export function createDetails(evento, container) {
    container.innerHTML = `
    <div class="card" style="width: 40rem;">
    <img src="${evento.image}" class="food-festival" alt="detail-img"
        style="width: 90%; align-self: center; margin-top: 2rem; border-radius: 10%;">
    <div class="card-body">
        <h5 class="card-title" style="font-size: 2rem;">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
    </div>
    <ul class="list-group list-group-flush" style="text-align: center;">
        <li class="list-group-item">Category: ${evento.category}</li>
        <li class="list-group-item">Date: ${evento.date}</li>
        <li class="list-group-item">Place: ${evento.place}</</li>
        <li class="list-group-item">Capacity: ${evento.capacity}</</li>
        <li class="list-group-item">${evento.assistance === undefined ? 'Estimate' : 'Assistance'}:</span> ${evento.assistance === undefined ? evento.estimate : evento.assistance}</</li>
        <li class="list-group-item">Price:${evento.price}</</li>
    </ul>
    </div>`

}

