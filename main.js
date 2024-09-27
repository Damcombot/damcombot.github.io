import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.SpotLight("#ffffff", 13, 0, 40);
const renderer = new THREE.WebGLRenderer({ canvas });

// Audio setup
const audio = new Audio('star-travelers-adi-goldstein-main-version.mp3'); // Use the audio element from the HTML

// Load the GLTF model
const loader = new GLTFLoader();
let model = null; // Initialize model as null

loader.load(
  'untitled.glb', 
  (gltf) => {
    model = gltf.scene; // Set model when it's loaded
    model.rotation.y += THREE.MathUtils.degToRad(45); // Convert degrees to radians
    model.position.set(0, -0.5, 0);  // Adjust position if necessary
    model.scale.set(1, 1, 1);  // Scale the model if necessary
    scene.add(model);  // Add the model to the scene

    // Add event listener for model interaction after it's loaded
    window.addEventListener('click', onModelClick, false);
    adjustModelSize(); // Call adjustModelSize here to set the correct size after loading
  },
  undefined,
  (error) => {
    console.error('An error happened', error);
  }
);

camera.position.z = 4;

scene.background = new THREE.Color("#1b1b1b");
scene.add(light);
light.position.set(0, 3, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableRotate = true;
controls.enablePan = false;
controls.enableZoom = true;

// Play audio on model interaction
function onModelClick(event) {
  if (model) { // Check if model is loaded
    // Raycasting to detect mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Convert mouse coordinates to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check if the model is clicked
    const intersects = raycaster.intersectObject(model);
    if (intersects.length > 0) {
      audio.play();  // Play audio on model interaction
    }
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Adjust model size for mobile screens
function adjustModelSize() {
  if (model) { // Check if model is defined
    if (window.innerWidth <= 768) {
      // Mobile screen: Scale down the model
      model.scale.set(0.5, 0.5, 0.5);  // Set the scale smaller for mobile
    } else {
      // Larger screens: Use the default scale
      model.scale.set(1, 1, 1);  // Default scale for desktop
    }
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  adjustModelSize();  // Adjust model size on resize if model is loaded
});

// Initial model size adjustment
animate();
