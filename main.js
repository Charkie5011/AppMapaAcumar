// Creado en Cátedra Diaz Cortez 2023 Comisión Avanzada
// Docentes: Juan Marcelo Diaz Cortez y Carlos Lage

const root = document.getElementById("root");
fetch("./data.json")
  .then((j) => j.json())
  .then((data) => {
    console.log(data);
    dibujarHeader();
    dibujarMarcador(data);
    dibujarPie();
  });

function dibujarHeader() {
  const cajaHeader = document.createElement("header");
  cajaHeader.className = "encabezado";

  const divLogo = document.createElement("div");
  divLogo.className = "logoAcumar";
  const imgLogo = document.createElement("img");
  imgLogo.src = "./imgs/iconos/SVG/logo.svg";
  imgLogo.style.height = "auto";
  imgLogo.style.width = "50px";

  const aAcumar = document.createElement("a");
  aAcumar.textContent = "Acumar";
  aAcumar.style.color = "white";
  aAcumar.style.textDecoration = "none";
  aAcumar.style.fontSize = "24pt";
  aAcumar.style.fontWeight = "Bold";
  aAcumar.href = "https://www.acumar.gob.ar/";

  const h1Titulo = document.createElement("h1");
  h1Titulo.style.color = "white";

  h1Titulo.textContent = "Mapa Dinámico Patrimonio – Isla Maciel";

  divLogo.appendChild(imgLogo);
  divLogo.appendChild(aAcumar);
  cajaHeader.appendChild(divLogo);
  cajaHeader.appendChild(h1Titulo);

  root.appendChild(cajaHeader);
}

function dibujarContenido() {
  const cajaMapa = document.createElement("div");
  cajaMapa.id = "cajaMapa";
  /*cajaMapa.onmousemove=function(ev){
      //console.dir(ev);
  console.log(`X=${ev.offsetX}  Y=${ev.offsetY}`);
  }*/
  root.appendChild(cajaMapa);
  return cajaMapa;
}

function dibujarMarcador(data) {
  console.log(data);
  const canvas = dibujarContenido();
  data.data.map((elem) => dibujarMarcador2(elem, canvas));
}
function dibujarMarcador2(item, canvas) {
  const cajaMarcador = document.createElement("div");
  const imgMarcador = document.createElement("img");
  const posX = item.coords.x;
  const posY = item.coords.y;
  cajaMarcador.id = item.id;
  imgMarcador.src = item.icono;
  cajaMarcador.className = "marcador";

  cajaMarcador.style.left = posX + "px";
  cajaMarcador.style.top = posY + "px";

  cajaMarcador.onclick = function (ev) {
    console.log(ev.target);
    console.log(item);
    if (!document.getElementById("cajaInfo0" + item.id)) {
      dibujarInfo(cajaMarcador, item);
      /*const previo = document.getElementById("cajaInfo0"+ item.id);
            console.log("el que estaba es" + previo);
            borrar(previo);
        }
        else{
            
            dibujarInfo(cajaMarcador , item);*/
    }
  };

  cajaMarcador.onmouseleave = function (ev) {
    const modal = document.getElementById("cajaInfo0" + item.id);
    console.log(modal);
    if (modal) modal.remove();
  };

  cajaMarcador.appendChild(imgMarcador);
  canvas.appendChild(cajaMarcador);
}
//

function dibujarInfo(objetivo, data) {
  const cajaInfo = document.createElement("div");
  cajaInfo.className = "infoModal";
  cajaInfo.id = "cajaInfo0" + data.id;
  const h3Titulo = document.createElement("h3");

  const cajaImgInfo = document.createElement("div");
  cajaImgInfo.className = "imgInfo";
  const imgInfo = document.createElement("img");
  imgInfo.className = "imgInfo";

  const cajaBajada = document.createElement("div");
  const pBajada = document.createElement("p");

  h3Titulo.textContent = data.titulo;
  imgInfo.src = data.imagen;
  pBajada.textContent = data.bajada;

  cajaImgInfo.appendChild(imgInfo);
  cajaBajada.appendChild(pBajada);

  cajaInfo.appendChild(h3Titulo);
  cajaInfo.appendChild(cajaImgInfo);
  cajaInfo.appendChild(cajaBajada);

  objetivo.appendChild(cajaInfo);
  cajaInfo.scrollIntoView();
}

function dibujarPie() {
  const footer = document.createElement("footer");
  const divMsgFooter = document.createElement("div");
  const pMsgFooter = document.createElement("p");

  const divRotulo = document.createElement("div");
  divRotulo.className = "btnPrototipo";
  const aRotulo = document.createElement("a");
  aRotulo.textContent = "Rótulo";
  aRotulo.href = "./caratula.html";

  footer.className = "pie";

  pMsgFooter.textContent =
    "Aplicacion creada en Cátedra Diaz Cortez || FADU UBA || 2023";

  divRotulo.appendChild(aRotulo);
  divMsgFooter.appendChild(pMsgFooter);
  footer.appendChild(divMsgFooter);
  footer.appendChild(divRotulo);

  root.appendChild(footer);
}

function borrarNodo(nodo, padre) {
  padre.removeChild(nodo);
}
function borrar(objetivo) {
  while (objetivo.firstChild) {
    borrarNodo(objetivo.firstChild, objetivo);
    objetivo.remove();
  }
}
