//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

let taille = 16;
let angleChoisi = Math.PI*2;
let offsetY = 0;
let light = 5 

//OrbitControls allow the camera to move around the scene


//Set which object to render
let objToRender = 'goblin';
const norm = document.getElementById('norm');

const buttonG = document.getElementById('goblin');
const buttonK = document.getElementById('kanye');
const buttonS = document.getElementById('shrek');
const buttonT = document.getElementById('trump');


buttonG.addEventListener('click', function() {
    objToRender = 'goblin';  // Change le texte du bouton
    
     taille = 16 ;
angleChoisi = Math.PI*2;
offsetY =  0;
unloadModel();
     loadModel();
     
  });
  
  buttonK.addEventListener('click', function() {
     objToRender = 'kanye';  // Change le texte du bouton
      
      taille = 210 ;
      angleChoisi = 0;
      offsetY = -120;
      
      unloadModel();
      loadModel();
      
  });
  buttonS.addEventListener('click', function() {
    objToRender = 'shrek';  // Change le texte du bouton
    
    taille = 160 ;
angleChoisi = Math.PI*4;
offsetY =  -200;
light = 0;
unloadModel();
     loadModel();
  });
  
  buttonT.addEventListener('click', function() {
     objToRender = 'trump';  // Change le texte du bouton
     
     taille = 50 ;
angleChoisi = 0;
offsetY =  0;
light = 0;
      unloadModel();
      loadModel();
  });



//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();
loadModel();
function loadModel() {
    
//Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
    object.position.set(0, offsetY, 0);

    //aggrandir l'objet 
    object.scale.set(taille, taille, taille); // Multiplie l'échelle par 2 sur tous les axes (X, Y, Z)
    //object.rotation.y = Math.PI / 2;
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 25 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, light);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  
    //I've played with the constants here until it looked good 
    object.rotation.y = (Math.PI/4)+(-angleChoisi + -3 + mouseX / window.innerWidth * 3)*0.5;
    object.rotation.x = 0 + (-1.2 + mouseY * 2.5 / window.innerHeight)*0.5 ;
  
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
norm.textContent = objToRender;
//Start the 3D rendering
animate();
}
function unloadModel() {
    // Si un objet est déjà présent, on le retire de la scène
    if (object) {
        scene.remove(object);
        object.traverse(child => {
            if (child.isMesh) {
                child.geometry.dispose(); // Nettoyage de la géométrie
                child.material.dispose(); // Nettoyage du matériau
            }
        });
        object = null;  // Réinitialiser la variable 'object'
    }
}
