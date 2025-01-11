
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

// Declaración de las variables principales
var scene, camera, renderer, model, border;
var loader = new THREE.GLTFLoader(); // Cargador de modelos GLTF
var raycaster = new THREE.Raycaster(); // Raycaster para interacciones
var mouse = new THREE.Vector2(); // Vector para almacenar la posición del mouse

// Inicialización de la escena
init();

// Función que configura la escena, cámara, luces y el cargador de modelos
function init() {
    // Crear la escena 3D
    scene = new THREE.Scene();

    // Crear la cámara (perspectiva, campo de visión, relación de aspecto, distancia mínima y máxima)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Crear el renderizador WebGL
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // Establecer el tamaño del renderizador
    document.body.appendChild(renderer.domElement); // Añadir el canvas del renderizador al cuerpo de la página

    // Cargar el modelo GLTF
    loader.load('https://raw.githubusercontent.com/SebastianZairAciar/PaginaWeb/refs/heads/Web/scene.gltf', function (gltf) {
        model = gltf.scene; // Asignar el modelo cargado a la variable "model"
        scene.add(model); // Añadir el modelo a la escena

        // Crear un borde (cubo) alrededor del modelo para hacerlo más visible
        createBorder(); // Llamamos a la función para crear el recuadro
    });

    // Añadir iluminación a la escena
    var light = new THREE.AmbientLight(0x404040);  // Luz ambiental suave
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
    directionalLight.position.set(1, 1, 1).normalize(); // Posición de la luz
    scene.add(directionalLight);

    // Colocar la cámara a una distancia adecuada
    camera.position.z = 5;

    // Añadir un evento para mover el mouse y ajustar la vista
    document.addEventListener('mousemove', onMouseMove, false);

    // Iniciar la animación
    animate();
}

// Función que maneja el movimiento del mouse
function onMouseMove(event) {
    // Convertir las coordenadas del mouse a un rango entre -1 y 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// Función que crea el borde alrededor del modelo (un cubo)
function createBorder() {
    var geometry = new THREE.BoxGeometry(1, 1, 1); // Crear un cubo de tamaño 1x1x1
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // Material rojo y con wireframe
    border = new THREE.Mesh(geometry, material); // Crear el cubo con el material
    border.position.set(0, 0, 0); // Posicionar el cubo alrededor del modelo
    scene.add(border); // Añadir el borde a la escena

    // Ajustar el tamaño del borde en función del modelo (esto se puede ajustar más si es necesario)
    var box = new THREE.Box3().setFromObject(model); // Crear una caja que envuelva el modelo
    var size = box.getSize(new THREE.Vector3()); // Obtener el tamaño del modelo
    border.scale.set(size.x, size.y, size.z); // Ajustar el tamaño del borde al tamaño del modelo
}

// Función que se llama continuamente para actualizar y renderizar la escena
function animate() {
    requestAnimationFrame(animate); // Llamar a la función "animate" en cada frame

    // Rotar el modelo para hacerlo más interesante (rotación continua)
    if (model) {
        model.rotation.x += 0.01; // Rotación en el eje X
        model.rotation.y += 0.01; // Rotación en el eje Y
    }

    // Rotar el borde también para que se vea en todo momento
    if (border) {
        border.rotation.x += 0.01;
        border.rotation.y += 0.01;
    }

    // Renderizar la escena con la cámara
    renderer.render(scene, camera);
}
