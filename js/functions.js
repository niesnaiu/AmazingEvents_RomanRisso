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


export function filtroChecks(evento) {
    let cambCheck = [...document.querySelectorAll("input[type='checkbox']:checked"),].map(check => check.value);
    if (cambCheck.length === 0) {
        return evento;
    }
    return evento.filter((filtroCheck) => cambCheck.includes(filtroCheck.category));
}
export function filtroBuscar(buscar, dataEvents) {
    
    let busqueda = dataEvents.filter(buscadorInterno => buscadorInterno.name.toLowerCase().includes(buscar));
    if (busqueda.length === 0) {
        return;

    }
    return busqueda;
}



export function createDetails(evento, container) {
    container.innerHTML = `
    <div class="card" style="width: 40rem;">
    <img src="${evento.image}" class="food-festival" alt="detail-img"
        style="width: 90%; align-self: center; margin-top: 2rem;">
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

export function createCards(estado, lista, currentDate) {
    const tarjeta = document.getElementById("tarjetitas");
    let card = "";
   
    for (let evento of lista) {
        if (estado == 0) {
            //todos los eventos
            card += generaCard(evento);
        }
        else if (estado == 2) {
            //upcoming
        if (evento.date > currentDate) {
            card += generaCard(evento);
            }
        }else if (estado == -1) {
            // pastevents
            if (evento.date < currentDate) {
                card += generaCard(evento);
            } 
        }
    }
    tarjeta.innerHTML = card;
}


function generaCard(evento){
    let card= '';
    card += `<div class="card" style="width: 18rem;">
    <img src="${evento.image}" class="card-img-top p-2" alt="${evento.name}.img">
    <div class="card-body">
    <h5> ${evento.name} </h5>
    <p class="card-text" id="textoParrafo"> ${evento.description} </p>
    <div id="boton1">
    <p> Price: $ ${evento.price} </p>
    <a href= "details.html?id=${evento._id}&nombre=${evento.name}" class="btn btn-primary" id="move">Details</a>"
    </div>
    </div>
    </div>`;
    return card;
}



export function ordenaArray(arrayOriginal) {
    let array = [].concat(arrayOriginal)
    let asistencia_dato  = array.sort((a, b) => ((a.assistance ? a.assistance : a.estimate)  / a.capacity) - ((b.assistance ? b.assistance : b.estimate) / b.capacity))

    let array_cap = [].concat(arrayOriginal)
    let capacidad_mayor_dato =  array_cap.sort((a, b) => b.capacity - a.capacity   )[0]
   
    let res = {asistencia : asistencia_dato, capacidad_mayor:capacidad_mayor_dato}
    return res
}

export function separaFuturoPasado(arrayOriginal, currentDate) {
    let array_futuro = []
    let array_pasado = []
    for (let evento of arrayOriginal) {
        if (evento.date > currentDate) {
            array_futuro.push(evento)
        } else {
            array_pasado.push(evento)
        }
    }

    return {futuro:array_futuro, pasado:array_pasado}
    
}

export function agregar_estadistica (arrayDatos) {
    let tr_estad_tit = document.getElementById("eventos-estad")

    let td_estad_asistencia_mayor = document.createElement("td")
    let td_estad_asistencia_menor = document.createElement("td")
    let td_estad_capacidad_mayor = document.createElement("td")

    td_estad_asistencia_menor.innerText= arrayDatos['asistencia'][0].name

    td_estad_asistencia_mayor.innerText = arrayDatos['asistencia'][arrayDatos['asistencia'].length-1].name
    
    td_estad_capacidad_mayor.innerText = arrayDatos['capacidad_mayor'].name
    

    tr_estad_tit.appendChild(td_estad_asistencia_mayor)
    tr_estad_tit.appendChild(td_estad_asistencia_menor)
    tr_estad_tit.appendChild(td_estad_capacidad_mayor)
}

export function procesaDatos (arrayDatos) {
    let estadisticas_futuros = agrupar_categoria(arrayDatos['futuro'])
    let estadisticas_pasado = agrupar_categoria(arrayDatos['pasado'])

    let tabla_futuros = document.getElementById('tr-upcoming')
    let tabla_pasado = document.getElementById('tr-pastevents')
    AgregaDatosTabla(estadisticas_futuros, tabla_futuros)
    AgregaDatosTabla(estadisticas_pasado, tabla_pasado)
}

function AgregaDatosTabla(arrayDatos, elementoH) {
    
    arrayDatos.categorias.forEach(item => {
        let traux = document.createElement('tr')
        
        let tdcat = document.createElement('td')
        let tdrev = document.createElement('td')
        let tdatt = document.createElement('td')

        tdcat.innerText = item
        tdrev.innerText = '$ ' + arrayDatos.ganancias[item].toFixed(2)
        tdatt.innerText = arrayDatos.porcentajes[item].toFixed(2) + '%'

        traux.appendChild(tdcat)
        traux.appendChild(tdrev)
        traux.appendChild(tdatt)
        
        elementoH.insertAdjacentElement('afterend',traux)
    })
}

function agrupar_categoria(arrayDatos) {
    const resu = arrayDatos.reduce((resu, item) => {
        const cat = item.category
        if (!resu.categorias.includes(cat)) {
            resu.categorias.push(cat)
            resu.ganancias[cat] = 0
            resu.attendance[cat] = 0
            resu.capacidad[cat] = 0
        }
        let aux_att_est = item.assistance ? item.assistance : item.estimate
        resu.capacidad[cat] += item.capacity
        resu.attendance[cat] += aux_att_est 
        resu.ganancias[cat] += item.price * aux_att_est     
        
        return resu
}, { categorias: [],capacidad: {}, attendance: {}, ganancias: {}, porcentajes: {}  })
    resu.categorias.forEach(cate => {
        resu.porcentajes[cate] = resu.attendance[cate] / resu.capacidad[cate] * 100
    })
    return resu
}

