function getInfo() {
  let url =
    "http://the-one-api.dev/v2/character?name=" +
    document.getElementById("buscador").value;

  let libros = "";
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
    .then(function cogerLibros(datos) {
      for (let i = 0; i < datos.docs.length; i++) {
        if (typeof datos.docs[i].name !== "undefined") {
          console.log(i);
          let nombre = datos.docs[i].name[0];
          libros =
            libros +
            `<div class="mainSearcher">
                           <div class="card">
                           <div class="iconoCorazon">
                               <img onmouseout="this.src='./img/corazon_vacio.svg';" onmouseover="this.ssrc='./img/corazon.svg';" 
                               onclick="guardarFavoritos(${datos.docs.name})" src="./img/corazon_vacio.svg" alt="icono corazon"/>
                           </div>
                           <div class="infoTitle">
                               <div>
                                   <h4 class="infoName">${datos.docs[i].name}</h4>
                                   <p>${datos.docs[i].race}</p>
                                   <p>${datos.docs[i].gender}</p>
                               </div>
                               <p class="infoAnother">${datos.docs[i].birth}</p>
                               <p class="infoAnother">${datos.docs[i].death}</p>
                               <a class="infoAnother" href="${datos.docs[i].wikiUrl}" target="_blank">Más información</a>
                           </div>
                           </div>
                           </div>
                       </div>`;
        }
      }
      document.getElementById("resultadosBusqueda").innerHTML = libros;
    })
    .catch(function () {
      window.alert("Error al llamar a la API");
    });
}

let favoritos = [];
let titulo = "";
function guardarFavoritos() {
  titulo = document.getElementsByClassName("iconoCorazon").value;
  window.alert(titulo);
  favoritos.push(titulo);
  let favoritosJSON = JSON.stringify(favoritos);
  localStorage.setItem("favoritos", favoritosJSON);
}

function mostrarLocal() {
  let favoritos = localStorage.getItem("favoritos");
  let favoritosParseada = JSON.parse(favoritos);
  document.getElementById("parrafo").innerHTML = `<p>${favoritosParseada}</p>`;
}
