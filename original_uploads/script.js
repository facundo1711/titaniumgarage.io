const contenedor = document.getElementById("imagenes");
const imagenes = contenedor.querySelectorAll("img");
const total = imagenes.length;
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
const indicadores = document.getElementById("indicadores");

let index = 0;

// Crear puntos
for (let i = 0; i < total; i++) {
  const punto = document.createElement("span");
  punto.classList.add("punto");
  if (i === 0) punto.classList.add("activo");
  punto.addEventListener("click", () => {
    index = i;
    actualizarCarrusel();
  });
  indicadores.appendChild(punto);
}
const puntos = document.querySelectorAll(".punto");

function actualizarCarrusel() {
  imagenes.forEach((img, i) => {
    img.classList.toggle("activa", i === index);
  });
  puntos.forEach((p, i) => p.classList.toggle("activo", i === index));
}

// Botón siguiente
siguiente.addEventListener("click", () => {
  index = (index + 1) % total;
  actualizarCarrusel();
});

// Botón anterior
anterior.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  actualizarCarrusel();
});

// Auto-play cada 5 segundos
setInterval(() => {
  index = (index + 1) % total;
  actualizarCarrusel();
}, 5000);

actualizarCarrusel();




