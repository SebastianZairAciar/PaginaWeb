
// Seleccionamos todas las imágenes dentro de la clase "imagenes"
const imagenes = document.querySelectorAll('img');

// Función para pausar todas las animaciones
function pausarAnimaciones() {
  imagenes.forEach(imagen => {
    imagen.style.animationPlayState = 'paused'; // Pausamos la animación
  });
}

// Función para reanudar todas las animaciones
function reanudarAnimaciones() {
  imagenes.forEach(imagen => {
    imagen.style.animationPlayState = 'running'; // Reanudamos la animación
  });
}

// Cuando el ratón pasa sobre cualquier imagen, pausamos todas las animaciones
imagenes.forEach(imagen => {
  imagen.addEventListener('mouseenter', pausarAnimaciones);
  imagen.addEventListener('mouseleave', reanudarAnimaciones);
});

