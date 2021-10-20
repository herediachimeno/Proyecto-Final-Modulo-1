let docs = "";

function getInfo() {
  let url =
    "http://the-one-api.dev/v2/character?race=" +
    document.getElementById("buscador").value;

  let info = "";
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer I6UmYPcLiqc-kJrk068m");
  fetch(url, {
    method: "GET",
    headers: myHeaders,
  })
    .then(function recibirRespuesta(respuesta) {
      return respuesta.json();
    })
    .then(function getInfo(datos) {
      for (let i = 0; i < datos.docs.length; i++) {
        if (typeof datos.docs[i].name !== "undefined") {
          console.log(i);
          let nombre = datos.docs[i].name[0];
          info =
            info +
            `<div class="mainSearcher">
                           <div class="card">
                           <div class="iconoCorazon">
                               <img onmouseout="this.src='./img/corazon.svg';" onmouseover="this.src='./img/corazon.svg";" 
                               onclick="guardarFavoritos(${i})" src="./img/corazon_vacio.svg" alt="icono corazon"/>
                           </div>
                           <div class="infoTitle">
                               <div>
                                   <h4 class="infoName">${datos.docs[i].name}</h4>
                                   <p>${datos.docs[i].race}</p>
                                   <p>${datos.docs[i].gender}</p>
                               </div>
                               <p class="infoAnother">${datos.docs[i].birth}</p>
                               <p class="infoAnoher">${datos.docs[i].death}</p>
                               <a class="infoAnother" href="${datos.docs[i].wikiUrl}" target="_blank">Más información</a>
                           </div>
                           </div>
                           </div>
                       </div>`;
        }
      }
      document.getElementById("resultadosBusqueda").innerHTML = info;
    })
    .catch(function () {
      window.alert("Error al llamar a la API");
    });
}

let favoritos = [];

function guardarFavoritos(i) {
  if (localStorage.getItem("favoritos") !== null) {
    favoritos = JSON.parse(localStorage.getItem("favoritos"));
  }
  window.alert("Guardado en Favoritos");
  favoritos.push(docs[i]);
  let favoritosJSON = JSON.stringify(favoritos);
  localStorage.setItem("favoritos", favoritosJSON);
}

function leerFavoritos() {
  let misFavoritos = localStorage.getItem("favoritos");
  misFavoritos = JSON.parse(misFavoritos);
  console.log(misFavoritos);
  info = "";
  for (let i = 0; i < misFavoritos.length; i++) {
    info =
      info +
      `
      <div id="mainSearcher">
      <div class="card">
      <div class="infoTitle">
        <div>
          <h4 class="infoName">${misFavoritos[i].name}</h4>
          <p>${misFavoritos[i].race}</p>
          <p>${misFavoritos[i].gender}</p>
        </div>
      <p class="infoAnother">${misFavoritos[i].birth}</p>
      <p class="infoAnother">${misFavoritos[i].death}</p>
      <p class="infoAnother" href="${misFavoritos[i].wikiUrl}" target="_blank">Más información</a>
      </div>
      </div>
      </div>
      </div>
      `;
  }
  document.getElementById("mainMisFavoritos").innerHTML = info;
}
