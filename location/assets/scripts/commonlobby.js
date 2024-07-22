// import '../styles/style.css';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// Scene and Camera Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 10000); // Field of View, Aspect Ratio, Near and Far Clipping Plane
scene.add(camera);
camera.position.set(0, 12, -40);
camera.rotation.set(0,Math.PI,0);

var manager = new THREE.LoadingManager();
// var svgIcon = document.getElementById("animatesvg")
// svgIcon.style.strokeDashoffset = 141;

// var progressPage = document.getElementById("progressPage");
let loader = document.querySelector('.loader');
manager.onProgress = function (item, loaded, total) {
    // let loadPercentage = (loaded / total * 100);
    // let clampedValue = Math.min(Math.max(loadPercentage, 0), 100) * (141 / 100);
    // svgIcon.style.strokeDashoffset = 141 - clampedValue;
    hideMenu();
};
manager.onLoad = () => {
    // console.log("EVERYTHING LOADED");
    // progressPage.classList.remove("flex");
    // progressPage.classList.add("hidden");

    loader.style.display = 'none';
    showMenu();
}

const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( 'jsm/libs/draco/' );
		dracoLoader.setDecoderConfig( { type: 'js' } );

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
// renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xd6c8b9, 2);
ambientLight.castShadow = true;
scene.add(ambientLight);


// Red Tracker
const redTracker = () => {
    const sphereGeometry = new THREE.SphereGeometry(0.01, 16, 16); // Radius, Width Segments, Height Segments
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.z = -5;
    camera.add(sphere);
    scene.add(camera);
}
redTracker();


const createFloor = (texturePath, yPos) => {
    const planeGeometry = new THREE.PlaneGeometry(150, 150, 10);
    // Load the texture from the given path
    const textureLoader = new THREE.TextureLoader(manager);
    const floorTexture = textureLoader.load(texturePath);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({
        // color: 0xe1dedc,
        // color: color,
        map: floorTexture,
        side: THREE.DoubleSide
    });
    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    floorPlane.receiveShadow = true;
    floorPlane.castShadow = true;
    floorPlane.rotation.x = 0.5 * Math.PI;
    floorPlane.position.y = yPos;
    floorPlane.position.z = 25;
    scene.add(floorPlane);
};
// Creating floors with colors instead of textures
createFloor('/../../static/assets/img/wallNew.jpg', 0);   // Ground Floor - Grey
createFloor('/../../static/assets/img/floorTexture.png', 50);    // Ground Floor Ceiling - Dark Grey
createFloor('/../../static/assets/img/wallNew.jpg', 51);  // First Floor - Grey
createFloor('/../../static/assets/img/floorTexture.png', 102);    // First Floor Ceiling - Dark Grey
createFloor('/../../static/assets/img/wallNew.jpg', 103);  // Second Floor - Grey
createFloor('/../../static/assets/img/floorTexture.png', 151);    // Second Floor Ceiling - Dark Grey
// createFloor('/../../static/assets/img/wallNew.jpg', 152);  // Third Floor - Grey
// createFloor('/../../static/assets/img/floorTexture.png', 201);    // Third Floor Ceiling - Dark Grey
// createFloor('/../../static/assets/img/wallNew.jpg', 202);  // Fourth Floor - Grey
// createFloor('/../../static/assets/img/floorTexture.png', 251);    // Fourth Floor Ceiling - Dark Grey


const createCarpet = (texturePath, yPos) => {
    const planeGeometry = new THREE.PlaneGeometry(30, 110, 10);
    // Load the texture from the given path
    const textureLoader = new THREE.TextureLoader(manager);
    const carpetTexture = textureLoader.load(texturePath);
    carpetTexture.wrapS = THREE.RepeatWrapping;
    carpetTexture.wrapT = THREE.RepeatWrapping;
    carpetTexture.repeat.set(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
        // color: 0xe1dedc,
        // color: color,
        map: carpetTexture,
        side: THREE.DoubleSide
    });
    const carpetPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    carpetPlane.receiveShadow = true;
    carpetPlane.castShadow = true;
    carpetPlane.rotation.x = 0.5 * Math.PI;
    carpetPlane.position.y = yPos;
    carpetPlane.position.x = 0;
    carpetPlane.position.z = 30;
    scene.add(carpetPlane);
};
createCarpet('/../../static/assets/img/ground.jpg', 1);   // Ground Floor - Grey
createCarpet('/../../static/assets/img/ground.jpg', 52.5);  // First Floor - Grey
createCarpet('/../../static/assets/img/ground.jpg', 103.5);  // Second Floor - Grey
// createCarpet('/../../static/assets/img/ground.jpg', 153.5);  // Third Floor - Grey


// Model on the center of the Ground Floor
const loadModel = (modelName, position, scale, rotation) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load(`${modelName}.glb`, (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(...position);
        mesh.scale.set(...scale);
        mesh.rotation.set(...rotation);
        scene.add(mesh);
    }, (xhr) => {
        // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
    }, (error) => {
        // console.error(error);
    });
};

const models = [
    { modelName: 'eyantraText', position: [40 , 14, 99], scale: [10, 10, 10], rotation: [0, -Math.PI, 0] },
    { modelName: 'groundFloorText', position: [-55, 30, -54], scale: [3, 3, 3], rotation: [0, 0, 0] },
    { modelName: 'firstFloorText', position: [-55, 80, -49], scale: [3, 3, 3], rotation: [0, 0, 0] },
    // {modelName: 'secondFloorText', position: [-55, 130, -49], scale: [3, 3, 3], rotation: [0, 0, 0] },
    {modelName: 'secondFloorImg', position: [0, 130, 99.5], scale: [45, 45, 45], rotation: [0, Math.PI/2, 0] },
    // {modelName: 'thirdFloorText', position: [-55, 180, -49], scale: [3, 3, 3], rotation: [0, 0, 0] },
    // {modelName: 'thirdFloorImg', position: [0, 175, 99.5], scale: [45, 45, 45], rotation: [0, Math.PI/2, 0] },
    {modelName: 'built', position: [25, 80, 96], scale: [8, 8, 8], rotation: [0, -Math.PI, 0]},
    {modelName: 'CenterModel1', position: [-0.2, 60, 29], scale: [0.7, 0.7, 0.7], rotation: [0, Math.PI,0]},
    {modelName: 'FourArmedChunda', position: [-74, 26, 87], scale: [1.5, 1.5, 1.5], rotation: [0, Math.PI/2,0]},
    {modelName:'JaggannathTekriStupa', position:[-74, 26, 38], scale:[1.5,1.5,1.5], rotation:[0, Math.PI/2, 0]},
    {modelName:'KamalBasti', position:[-74, 26, -12.5], scale:[1.5,1.5,1.5], rotation:[0, Math.PI/2, 0]},
    {modelName:'CopperplateGrants',position:[74,26,-27.5],scale:[1.5,1.5,1.5],rotation:[0, -Math.PI/2, 0]},
    {modelName:'vasantManthapa',position:[74,26,22],scale:[1.5,1.5,1.5],rotation:[0, -Math.PI/2, 0]},    
    {modelName:'brahmaOfGoa',position:[74,26,74],scale:[1.5,1.5,1.5],rotation:[0, -Math.PI/2, 0]},
    {modelName:'stoneCharriot',position:[74,75,-27.5],scale:[1.5,1.5,1.5],rotation:[0, -Math.PI/2, 0]},
    {modelName:'95YearOldGanesh',position:[74,75,25],scale:[1.5,1.5,1.5],rotation:[0, -Math.PI/2, 0]},
    {modelName:'tshoLahm',position:[-74,75,-15],scale:[1.5,1.5,1.5],rotation:[0, Math.PI/2, 0]},
    {modelName: 'stairsText2', position: [-10, 60, -123], scale: [2.5, 2.5, 2.5], rotation: [0, 0, 0] },
    {modelName:'lion1', position:[1, 2, 19], scale:[9,9,9], rotation:[0,-Math.PI,0]},

];
models.forEach(model => loadModel(model.modelName, model.position, model.scale, model.rotation));
console.log(models);



// go to upstairs
const goToUpstairs = [
    {position: [35, 20, -50], scale: [2, 2, 2], rotation: [0, 0, 0]},
    // {position: [35, 60, -50], scale: [2, 2, 2], rotation: [0, 0, 0]},
]
const loadGoToUpstairs = ( ) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('goToUpstairs.glb', (gltf) => {
        const mesh = gltf.scene.clone(); // Clone the loaded mesh
  
      goToUpstairs.forEach(model => {
        console.log("go to upstairs working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });
    }
        , (xhr) => {
            // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadGoToUpstairs();

//Warning Chain Barriers
const chainBarriers = [
    {position: [-3, 0, -50], scale: [0.06, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [-6, 152, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [10, 152, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [26, 152, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [-6, 103, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [10, 103, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
    // {position: [26, 103, -46], scale: [0.08, 0.06, 0.08], rotation: [0, -Math.PI/2, 0]},
]

const loadChainBarriers = ( ) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('chain_barrier.glb', (gltf) => {
        const mesh = gltf.scene.clone(); // Clone the loaded mesh
  
      chainBarriers.forEach(model => {
        console.log("chain barriers working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });
    }
        , (xhr) => {
            // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadChainBarriers();

// instructions
const instructions = [
    { position: [-55, 20, -49], scale: [2, 2, 2], rotation: [0, 0, 0]},
    {position: [-55, 70, -49], scale: [2, 2, 2], rotation: [0, 0, 0]},
    // {position: [-55, 120, -49], scale: [2, 2, 2], rotation: [0, 0, 0]},
    // {position: [-55, 170, -49], scale: [2, 2, 2], rotation: [0, 0, 0]},
]
const loadInstructions = ( ) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('instructions.glb', (gltf) => {
        const mesh = gltf.scene.clone(); // Clone the loaded mesh
  
  
      instructions.forEach(model => {
        console.log("instructions working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });
    }
        , (xhr) => {
            // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadInstructions();

// Palm Plant new
const palmPlant = [
    // ground floor
    {position: [59, -6, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [-75, -6, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [-75, -6, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    { position: [55, -6, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // first floor
    {position: [59, 45, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [-75, 45, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [-75, 45, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [55, 45, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // Middle plane of the stairs
    {position: [-18, 21, -70], scale: [10, 10, 10], rotation: [0, 0, 0]},
    {position: [20, 21, -70], scale: [10, 10, 10], rotation: [0, 0, 0]},
    //Second Floor
    // {position: [59, 97, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [-75, 97, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [-75, 97, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [55, 97, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    //Third Floor
    // {position: [59, 146, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [-75, 146, 147], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [-75, 146, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},
    // {position: [55, 146, 5], scale: [10, 10, 10], rotation: [0, 0, 0]},

]
const loadPalmPlant = () => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('palm_plant_new.glb', (gltf) => {
        const mesh = gltf.scene.clone(); // Clone the loaded mesh
  
  
      palmPlant.forEach(model => {
        console.log("plant working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });
    }
        , (xhr) => {
            // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadPalmPlant();


//Fencing Model Function
const fencingModels = [
    //Ground Floor
    { position: [53, 0, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI / 2, 0] },
    { position: [53, 0, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [53, 0, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 0, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 0, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 0, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    //First Floor
    { position: [53, 51, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI / 2, 0] },
    { position: [53, 51, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [53, 51, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 51, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 51, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    { position: [-90, 51, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    //Second Floor
    // { position: [53, 103, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI / 2, 0] },
    // { position: [53, 103, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [53, 103, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 103, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 103, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 103, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    //Third Floor
    // { position: [53, 152, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI / 2, 0] },
    // { position: [53, 152, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [53, 152, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 152, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 152, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 152, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // Fourth Floor
    // { position: [53, 202, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI / 2, 0] },
    // { position: [53, 202, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [53, 202, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 202, 80], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 202, 30], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
    // { position: [-90, 202, -20], scale: [1, 0.6, 1], rotation: [0, Math.PI/2, 0]},
]
const loadFencingModel = ( position, scale, rotation) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
     // Set up DRACOLoader
     const dracoLoader = new DRACOLoader();
     dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
    loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('vip_rope_barrier_new.glb', (gltf) => {
        const mesh = gltf.scene.clone(); // Clone the loaded mesh
  
  
      fencingModels.forEach(model => {
        console.log("working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });
    }
        , (xhr) => {
            // console.log(`loading model ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadFencingModel();

// Cube Geometry at the center of the ground floor
const createCube = (width, height, depth, position, color) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const texture = new THREE.TextureLoader().load('/../../static/assets/Default/Black_granite_BaseColor.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    scene.add(cube);
};

createCube(9, 8, 8, [0, 2, 30], 0x867a74);
createCube(9, 8, 8, [0, 55, 30], 0x867a74);

// Event listener for Q key
const Q_key = () => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Q' || event.key === 'q') {
            controls.unlock();
            openFloorSelectionModal();
        }
    });
    const floorSelectionModal = document.getElementById("floorSelectionModal");
    const floorSelectionClose = document.getElementById("floorSelectionClose");

    // Open the floor selection modal
    function openFloorSelectionModal() {
        floorSelectionModal.classList.add('show');
    }
    // Close the floor selection modal
    floorSelectionClose.onclick = function () {
        floorSelectionModal.classList.remove('show');
    }
    // Close the floor selection modal when the user clicks outside of it
    window.onclick = function (event) {
        if (event.target == floorSelectionModal) {
            floorSelectionModal.classList.remove('show');
        }
    }

    window.setCameraHeight = function (height) {
        camera.position.y = height;
        floorSelectionModal.classList.remove('show');
        
    }
}
Q_key();


function createWallSpotLight(position, targetPosition) {
    const color = new THREE.Color('white'),
        intensity = 2500,
        distance = 0,
        angle = 0.44,
        penumbra = 0.37,
        decay = 2;

    const wallSpotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
    wallSpotLight.position.set(...position);
    scene.add(wallSpotLight);

    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(...targetPosition);
    scene.add(spotTarget);
    wallSpotLight.target = spotTarget;

    // const wallSpotLightHelper = new THREE.SpotLightHelper(wallSpotLight);
    // scene.add(wallSpotLightHelper);


    // const gui = new dat.GUI();
    // const wallSpotLightFolder = gui.addFolder('wallSpotLight');
    // wallSpotLightFolder.add(wallSpotLight.position, 'x', -100, 100).name('X Position');
    // wallSpotLightFolder.add(wallSpotLight.position, 'y', 0, 100).name('Y Position');
    // wallSpotLightFolder.add(wallSpotLight.position, 'z', -100, 100).name('Z Position');
    // wallSpotLightFolder.add(wallSpotLight, 'intensity', 0, 10000).name('Intensity');
    // wallSpotLightFolder.add(wallSpotLight, 'distance', 0, 200).name('Distance');
    // wallSpotLightFolder.add(wallSpotLight, 'angle',  0, Math.PI / 3).name('Angle');
    // wallSpotLightFolder.add(wallSpotLight, 'penumbra', 0, 1).name('Penumbra');
    // wallSpotLightFolder.add(wallSpotLight, 'decay', 1, 2).name('Decay');
    // wallSpotLightFolder.open();
}
function createCenterWallSpotLight(position, targetPosition) {
    const color = new THREE.Color('white'),
        intensity = 854,
        distance = 0,
        angle = 0.84,
        penumbra = 0.17,
        decay = 2;

    const wallSpotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
    wallSpotLight.position.set(...position);
    scene.add(wallSpotLight);

    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(...targetPosition);
    scene.add(spotTarget);
    wallSpotLight.target = spotTarget;

    // const wallSpotLightHelper = new THREE.SpotLightHelper(wallSpotLight);
    // scene.add(wallSpotLightHelper);


    // const gui = new dat.GUI();
    // const wallSpotLightFolder = gui.addFolder('centerWallSpotLight');
    // wallSpotLightFolder.add(wallSpotLight.position, 'x', -100, 100).name('X Position');
    // wallSpotLightFolder.add(wallSpotLight.position, 'y', 0, 100).name('Y Position');
    // wallSpotLightFolder.add(wallSpotLight.position, 'z', -100, 100).name('Z Position');
    // wallSpotLightFolder.add(wallSpotLight, 'intensity', 0, 10000).name('Intensity');
    // wallSpotLightFolder.add(wallSpotLight, 'distance', 0, 200).name('Distance');
    // wallSpotLightFolder.add(wallSpotLight, 'angle',  0, Math.PI / 3).name('Angle');
    // wallSpotLightFolder.add(wallSpotLight, 'penumbra', 0, 1).name('Penumbra');
    // wallSpotLightFolder.add(wallSpotLight, 'decay', 1, 2).name('Decay');
    // wallSpotLightFolder.open();
}

//Ground Floor
createWallSpotLight([-60, 50, 80], [-73, 25 , 80]); // Left spotlight
createWallSpotLight([-60, 50, 30], [-73, 25, 30]); // Left spotlight
createWallSpotLight([-60, 50, -20], [-73, 25, -20]); // Left spotlight
createWallSpotLight([60, 50, 80], [73, 25, 80]); // Right spotlight
createWallSpotLight([60, 50, 30], [73, 25, 30]); // Right spotlight
createWallSpotLight([60, 50, -20], [73, 25, -20]); // Right spotlight
createCenterWallSpotLight([0, 46, 90], [0, 25, 100]); // Center spotlight
// //First Floor
createWallSpotLight([-60, 100, 80], [-73, 75 , 80]); // Left spotlight
createWallSpotLight([-60, 100, 30], [-73, 75, 30]); // Left spotlight
createWallSpotLight([-60, 100, -20], [-73, 75, -20]); // Left spotlight
createWallSpotLight([60, 100, 80], [73, 75, 80]); // Right spotlight
createWallSpotLight([60, 100, 30], [73, 75, 30]); // Right spotlight
createWallSpotLight([60, 100, -20], [73, 75, -20]); // Right spotlight

// //Second floor
// createWallSpotLight([-60, 150, 80], [-73, 125 , 80]); // Left spotlight
// createWallSpotLight([-60, 150, 30], [-73, 125, 30]); // Left spotlight
// createWallSpotLight([-60, 150, -20], [-73, 125, -20]); // Left spotlight
// createWallSpotLight([60, 150, 80], [73, 125, 80]); // Right spotlight
// createWallSpotLight([60, 150, 30], [73, 125, 30]); // Right spotlight
// createWallSpotLight([60, 150, -20], [73, 125, -20]); // Right spotlight
// // createWallSpotLight([0, 180, 90], [0, 140, 100]); // Center spotlight
// //Third Floor
// createWallSpotLight([-60, 200, 80], [-73, 175 , 80]); // Left spotlight
// createWallSpotLight([-60, 200, 30], [-73, 175, 30]); // Left spotlight
// createWallSpotLight([-60, 200, -20], [-73, 175, -20]); // Left spotlight
// createWallSpotLight([60, 200, 80], [73, 175, 80]); // Right spotlight
// createWallSpotLight([60, 200, 30], [73, 175, 30]); // Right spotlight
// createWallSpotLight([60, 200, -20], [73, 175, -20]); // Right spotlight
// createWallSpotLight([0, 228, 90], [0, 190, 100]); // Center spotlight
//Fourth Floor
// createWallSpotLight([-60, 280, 80], [-65, 240, 80]); // Left spotlight
// createWallSpotLight([-60, 280, 30], [-65, 240, 30]); // Left spotlight
// createWallSpotLight([-60, 280, -20], [-65, 240, -20]); // Left spotlight
// createWallSpotLight([60, 280, 80], [65, 240, 80]); // Right spotlight
// createWallSpotLight([60, 280, 30], [65, 240, 30]); // Right spotlight
// createWallSpotLight([60, 280, -20], [65, 240, -20]); // Right spotlight


// const color = new THREE.Color('white'),
// intensity = 1004,
// distance = 60,
// angle = 0.9,
// penumbra = 0.42,
// decay = 2;
// focus = 1;
// const wallSpotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
// wallSpotLight.position.set(0, 50, 90);
// wallSpotLight.rotation.set(0,5,2);
// scene.add(wallSpotLight);
// const spotTarget = new THREE.Object3D();
// spotTarget.position.set(0, 18, 90);
// scene.add(spotTarget);
// wallSpotLight.target = spotTarget;
// const wallSpotLightHelper = new THREE.SpotLightHelper(wallSpotLight);
// scene.add(wallSpotLightHelper);
// scene.add( new THREE.AmbientLight(0xffffff, 0.02));
// const gui = new dat.GUI();
// const wallSpotLightFolder = gui.addFolder('wallSpotLight');
// wallSpotLightFolder.add(wallSpotLight.position, 'x', -5000, 5000).name('X Position');
// wallSpotLightFolder.add(wallSpotLight.position, 'y', 0, 5000).name('Y Position');
// wallSpotLightFolder.add(wallSpotLight.position, 'z', -5000, 5000).name('Z Position');
// wallSpotLightFolder.add(wallSpotLight, 'intensity', 0, 10000).name('Intensity');
// wallSpotLightFolder.add(wallSpotLight, 'distance', 0, 200).name('Distance');
// wallSpotLightFolder.add(wallSpotLight, 'angle',  0, Math.PI / 3).name('Angle');
// wallSpotLightFolder.add(wallSpotLight, 'penumbra', 0, 1).name('Penumbra');
// wallSpotLightFolder.add(wallSpotLight, 'decay', 1, 2).name('Decay');
// wallSpotLightFolder.open();
// Create spotlights



const spotLights = [];

function createSpotlight(color, position, rotation) {
    const intensity = 3000;
    const distance = 50;
    const angle = 0.18;
    const penumbra = 0.6;
    const decay = 1.9;

    const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
    spotLight.position.copy(position);
    spotLight.rotation.copy(rotation);

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.camera.fov = 30;
    spotLight.shadow.camera.left = -50;
    spotLight.shadow.camera.right = 50;
    spotLight.shadow.camera.top = 50;
    spotLight.shadow.camera.bottom = -50;
    spotLight.shadow.camera.zoom = 1;

    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(position.x, position.y - 38, position.z);
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    scene.add(spotLight);
    spotLights.push(spotLight);
}

// Define spotlight configurations
const spotlightsConfigurations = [
    // Ground Floor
    { position: new THREE.Vector3(30, 40, 70), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(-30, 40, 70), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(30, 40, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 40, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 40, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(30, 40, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(30, 40, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 40, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // First Floor
    { position: new THREE.Vector3(30, 92, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 92, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(30, 92, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 92, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 92, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(30, 92, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(-30, 92, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(30, 92, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // Front Light on the first floor
    { position: new THREE.Vector3(0, 40, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(0, 70, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    { position: new THREE.Vector3(0, 80, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // Second Floor
    // { position: new THREE.Vector3(30, 140, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 140, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 140, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 140, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 140, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 140, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 140, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 140, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    //Front Light on the second Floor
    // { position: new THREE.Vector3(0, 90, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(0, 140, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(0, 150, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // Third Floor
    // { position: new THREE.Vector3(30, 190, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 190, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 190, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 190, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 190, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 190, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 190, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 190, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    //Front Light on the third floor
    // { position: new THREE.Vector3(0, 140, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(0, 190, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(0, 200, 30), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // Fourth Floor
    // { position: new THREE.Vector3(30, 240, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 240, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 240, 40), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 240, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 240, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 240, 70), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(30, 240, 10), rotation: new THREE.Euler(Math.PI / 4, 0, 0) },
    // { position: new THREE.Vector3(-30, 240, -20), rotation: new THREE.Euler(Math.PI / 4, 0, 0) }
];

// Create spotlights based on configurations
spotlightsConfigurations.forEach(config => {
    const color = new THREE.Color('white');
    createSpotlight(color, config.position, config.rotation);
});

// Front Light on the first floor
const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
frontLight.position.set(0, 120, 100);
scene.add(frontLight);


//create wall
const wallLoader = new THREE.TextureLoader();
let wallTexture;
function loadWallTexture() {
    return new Promise((resolve, reject) => {
      wallTexture = wallLoader.load('/../../static/assets/img/wallTexture.jpg', resolve, undefined, reject);
    });
  }
  
  const createWall = (width, height, position, addLightStrips = false, rotation = [0, 0, 0]) => {
    const geometry = new THREE.PlaneGeometry(width, height);
  
    // Use the pre-loaded wallTexture
    const material = new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(...position);
    wall.rotation.set(...rotation);
    scene.add(wall);
    
    if (addLightStrips) {
      const lightStripMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const lightStripGeometry = new THREE.BoxGeometry(0.5, height, 0.2);
      // Left light strip
      const leftLightStrip = new THREE.Mesh(lightStripGeometry, lightStripMaterial);
      leftLightStrip.position.set(position[0] - width / 2, position[1], position[2]);
      scene.add(leftLightStrip);
  
      // Right light strip
      const rightLightStrip = new THREE.Mesh(lightStripGeometry, lightStripMaterial);
      rightLightStrip.position.set(position[0] + width / 2, position[1], position[2]);
      scene.add(rightLightStrip);
    }
  };
 

  const createFloorWalls = (floorHeight) => {
    // Use the pre-loaded wallTexture for all walls
    createWall(150, 90, [0, floorHeight + 12.5, 100], true); // Back Wall
    createWall(150, 90, [75, floorHeight + 12.5, 25], false, [0, 0.5 * Math.PI, 0]); // Right Wall
    createWall(150, 90, [-75, floorHeight + 12.5, 25], false, [0, -0.5 * Math.PI, 0]); // Left Wall
    createWall(62, 90, [-44, floorHeight + 12.5, -50], true, [0, Math.PI, 0]); // Front Left Wall
    createWall(43, 90, [53.5, floorHeight + 12.5, -50], true); // Front Right Wall
    createWall(75, 100, [32.5, floorHeight + 20, -87.5],false, [0, 0.5 * Math.PI, 0]); // Front Right Plane Wall
    createWall(75, 100, [-13, floorHeight + 20, -87.5], false, [0, -0.5 * Math.PI, 0]); // Front Left Plane Wall
  };

  // Load the wall texture and then call createFloorWalls
  loadWallTexture()
    .then(() => {
      createFloorWalls(0); // Ground Floor
      createFloorWalls(80);  // First Floor
      createFloorWalls(160); // Second Floor
    //   createFloorWalls(240); // Third Floor
    //   createFloorWalls(320); // Fourth Floor
    })
    .catch((error) => {
      console.error('Error loading texture:', error);
    });



const lightStrip = (xPos, yPos, zPos) => {
    const lightStripMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lightStripGeometry = new THREE.BoxGeometry(0.5, 1000, 0.2); // Width, Height, Depth
    const lightStrip = new THREE.Mesh(lightStripGeometry, lightStripMaterial);
    lightStrip.position.set(xPos, yPos, zPos);
    scene.add(lightStrip);
}
lightStrip(-12.5, 6, -103);
lightStrip(32, 6, -103);
lightStrip(32.6, 6, -50);
lightStrip(-13.4, 6, -50);


// Front Wall
const createFrontWall = () => {
    const geometry = new THREE.PlaneGeometry(80, 500); 
    const material = new THREE.MeshStandardMaterial({ color: 0xc3bdb9, side: THREE.DoubleSide });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(0, 45, -124.5);
    scene.add(wall);
};
createFrontWall();


// Load ceiling light model
const ceilingLights = [
    // Ground Floor
    { position: [74, 49.8, 30], scale: [1, 1, 1] },
    { position: [74, 49.8, 80], scale: [1, 1, 1] },
    { position: [74, 49.8, -20], scale: [1, 1, 1] },
    { position: [-74, 49.8, 30], scale: [1, 1, 1] },
    { position: [-74, 49.8, -20], scale: [1, 1, 1] },
    { position: [-74, 49.8, 80], scale: [1, 1, 1] },
    { position: [0, 49.8, 0], scale: [1, 1, 1] },
    { position: [0, 49.8, 25], scale: [1, 1, 1] },
    { position: [0, 49.8, -25], scale: [1, 1, 1] },
    {position: [0, 49.8, 90], scale: [1, 1, 1]},
    // First Floor
    { position: [74, 101.5, 30], scale: [1, 1, 1] },
    { position: [74, 101.5, 80], scale: [1, 1, 1] },
    { position: [74, 101.5, -20], scale: [1, 1, 1] },
    { position: [-74, 101.5, 30], scale: [1, 1, 1] },
    { position: [-74, 101.5, -20], scale: [1, 1, 1] },
    { position: [-74, 101.5, 80], scale: [1, 1, 1] },
    { position: [0, 101.5, 0], scale: [1, 1, 1] },
    { position: [0, 101.5, 25], scale: [1, 1, 1] },
    { position: [0, 101.5, -25], scale: [1, 1, 1] },
    //Second Floor
    // { position: [74, 151, 30], scale: [1, 1, 1] },
    // { position: [74, 151, 80], scale: [1, 1, 1] },
    // { position: [74, 151, -20], scale: [1, 1, 1] },
    // { position: [-74, 151, 30], scale: [1, 1, 1] },
    // { position: [-74, 151, -20], scale: [1, 1, 1] },
    // { position: [-74, 151, 80], scale: [1, 1, 1] },
    // { position: [0, 151, 0], scale: [1, 1, 1] },
    // { position: [0, 151, 25], scale: [1, 1, 1] },
    // { position: [0, 151, -25], scale: [1, 1, 1] },
    //Third Floor
    // { position: [74, 201, 30], scale: [1, 1, 1] },
    // { position: [74, 201, 80], scale: [1, 1, 1] },
    // { position: [74, 201, -20], scale: [1, 1, 1] },
    // { position: [-74, 201, 30], scale: [1, 1, 1] },
    // { position: [-74, 201, -20], scale: [1, 1, 1] },
    // { position: [-74, 201, 80], scale: [1, 1, 1] },
    // { position: [0, 201, 0], scale: [1, 1, 1] },
    // { position: [0, 201, 25], scale: [1, 1, 1] },
    // { position: [0, 201, -25], scale: [1, 1, 1] },
    //Fourth Floor
    // { position: [70, 250, 30], scale: [1, 1, 1] },
    // { position: [70, 250, 80], scale: [1, 1, 1] },
    // { position: [70, 250, -20], scale: [1, 1, 1] },
    // { position: [-70, 250, 30], scale: [1, 1, 1] },
    // { position: [-70, 250, -20], scale: [1, 1, 1] },
    // { position: [-70, 250, 80], scale: [1, 1, 1] },
    // { position: [0, 250, 0], scale: [1, 1, 1] },
    // { position: [0, 250, 25], scale: [1, 1, 1] },
    // { position: [0, 250, -25], scale: [1, 1, 1] },

];
function createCeilingSpotlight(lightPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, 1, 50, Math.PI / 10, 5, 2);
    spotlight.position.set(lightPosition[0], lightPosition[1] - 1, lightPosition[2]);
    spotlight.target.position.set(lightPosition[0], lightPosition[1] - 10, lightPosition[2]);
  
    const spotlightHelper = new THREE.SpotLightHelper(spotlight);
  
    scene.add(spotlightHelper);
    scene.add(spotlight);
    scene.add(spotlight.target);
  }
const loadCeilingLight = () => {
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
     dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Set the path to Draco decoder files
     loader.setDRACOLoader(dracoLoader); // Enable DRACOLoader in GLTFLoader
    loader.load('ceiling_light_new.glb', (gltf) => {
        const mesh = gltf.scene;
        const targetPosition = [0, 20, 25];
        ceilingLights.forEach(light => {
            const lightPosition = light.position;
            const lightScale = light.scale;
            const clonedMesh = mesh.clone(); // Clone the mesh for each light
            clonedMesh.position.set(...lightPosition);
            clonedMesh.scale.set(...lightScale);
            scene.add(clonedMesh);
            console.log("ceiling spotlight");
            if (JSON.stringify(lightPosition) === JSON.stringify(targetPosition)) {
              createCeilingSpotlight(lightPosition);
            }
          });  
        
    }
        , (xhr) => {
            // console.log(`loading ceiling light ${xhr.loaded / xhr.total * 100}%`);
        }, (error) => {
            // console.error(error);
        });
};
loadCeilingLight();


const createImagePlaneWithBorder = (imageUrl, position, rotation, width, height, borderPositionOffset, hasBorder,slug, modalInfo, reportUrl, youtubeUrl, title) => {
    const textureLoader = new THREE.TextureLoader(manager);
    const imageTexture = textureLoader.load(imageUrl);
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ map: imageTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(rotation.x, rotation.y, rotation.z);
    scene.add(plane);

    if (hasBorder) {
        // const texture = textureLoader.load('/../../static/assets/img/blue.jpg');
        const borderGeometry = new THREE.PlaneGeometry(width + 0.5, height + 0.5);
        const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.set(position.x + borderPositionOffset.x, position.y + borderPositionOffset.y, position.z + borderPositionOffset.z);
        border.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(border);
    }

    plane.userData = { imageUrl, slug, modalInfo, reportUrl, youtubeUrl, title, position, rotation };
    return plane;
};

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const youtube = document.getElementById('youtube');
const modalLink = document.getElementById('modal-link');
const modalInfo = document.getElementById('modal-info');
const modalDescription = document.getElementById('modal-description');
const downloadPaperButton = document.getElementById('download-paper');
// const youtubePlayer = document.getElementById('youtube-player');

// Close modal
modalClose.onclick = function () {
    modal.classList.remove('show');
    // console.log("modal closed");
};


// Set up the back button action
youtube.onclick = function () {
    if (youtube.href) {
        window.open(youtube.href,'_blank');
    }
};

// Modal link will be updated dynamically based on the plane
modalLink.onclick = () => {
    console.log(modalLink.href);
    if (modalLink.href) {
        // window.location.href = modalLink.href;
        // window.open(modalLink.href, '_blank');
        // console.log(modalLink.href);
        let str =  '/modelPage/' + modalLink.href;
        window.open(str,'_blank');
        
    }
};
console.log(data);
// Add an event listener for the "P" key to show the selection modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key === 'P') {
        controls.unlock();
        showSelectionModal();
    }
});
const showSelectionModal = () => {
    const selectionModal = document.createElement('div');
    selectionModal.id = 'selectionModal';
    selectionModal.style.position = 'fixed';
    selectionModal.style.top = '50%';
    selectionModal.style.left = '50%';
    selectionModal.style.transform = 'translate(-50%, -50%)';
    selectionModal.style.background = 'rgba(255, 255, 255, 0.1)';
    selectionModal.style.borderRadius = '20px';
    selectionModal.style.padding = '20px';
    selectionModal.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    selectionModal.style.backdropFilter = 'blur(10px)';
    selectionModal.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    selectionModal.style.zIndex = '1000';
    selectionModal.style.overflowY = 'auto';
    selectionModal.style.maxHeight = '80%';
    selectionModal.style.width = '60%';
    selectionModal.style.color = 'black';

    const selectionModalClose = document.createElement('button');
    selectionModalClose.innerText = 'Close';
    selectionModalClose.style.marginBottom = '10px';
    selectionModalClose.style.padding = '10px 20px';
    selectionModalClose.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    selectionModalClose.style.border = 'none';
    selectionModalClose.style.borderRadius = '10px';
    selectionModalClose.style.cursor = 'pointer';
    selectionModalClose.onclick = () => {
        document.body.removeChild(selectionModal);
    };
    selectionModal.appendChild(selectionModalClose);

    planes.forEach((plane, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = plane.userData.imageUrl;
        imageElement.style.width = '100px';
        imageElement.style.height = '100px';
        imageElement.style.margin = '10px';
        imageElement.style.cursor = 'pointer';
        imageElement.style.borderRadius = '10px';
        imageElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        imageElement.onclick = () => {
            navigateToImage(index);
            document.body.removeChild(selectionModal);
        };

        const titleElement = document.createElement('div');
        titleElement.innerText = plane.userData.title;
        titleElement.style.textAlign = 'center';
        titleElement.style.marginTop = '5px';
        titleElement.style.fontWeight = 'bold';

        const imageContainer = document.createElement('div');
        imageContainer.style.display = 'inline-block';
        imageContainer.style.textAlign = 'center';
        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(titleElement);

        selectionModal.appendChild(imageContainer);
    });

    document.body.appendChild(selectionModal);
};
const navigateToImage = (index) => {
    const targetPlane = planes[index];
    const offset = -9;
    const position = targetPlane.userData.position;
    const rotation = targetPlane.userData.rotation;
    const planeNormal = new THREE.Vector3(0, 0, 1);
    planeNormal.applyEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z, 'XYZ'));
    const cameraPosition = new THREE.Vector3(
        position.x - planeNormal.x * offset,
        position.y - planeNormal.y * offset,
        position.z - planeNormal.z * offset
    );
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(position.x, position.y, position.z);
};
const checkCameraPosition = () => {
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);

    let modalVisible = false;

    planes.forEach(plane => {
        const planePosition = new THREE.Vector3();
        plane.getWorldPosition(planePosition);

        const distance = cameraPosition.distanceTo(planePosition);
        const facing = isCameraFacingPlane(camera, plane);

        if (distance < 14.5 && facing) {
            modalVisible = true;
            modalImage.src = plane.userData.imageUrl; // Load the image into the modal
            modalLink.href = plane.userData.exhibit_model; // Set the modal link
            modalLink.href = plane.userData.slug; // Set the modal link

            // modalLink.href = plane.userData.exhibit_model; // Set the modal link

            modalLink.href = plane.userData.slug; // Set the modal link

            modalTitle.innerText = plane.userData.title; // Set the modal title
            modalDescription.innerText = plane.userData.modalInfo; // Set the modal info
            downloadPaperButton.onclick = () => {
                window.location.href = plane.userData.reportUrl; // Set the download link
            };
            // youtubePlayer.src = plane.userData.youtubeUrl; // Set the youtube video
            youtube.href = plane.userData.youtubeUrl;
        }
    });

    if (modalVisible) {
        modal.classList.add('show');
        modal.style.pointerEvents = 'auto'; // Enable pointer events when modal is open
    } else {
        modal.classList.remove('show');
        modal.style.pointerEvents = 'none'; // Disable pointer events when modal is closed
    }
};

// load stand
const stands = [
     // Ground Floor
     { position: [-30, 0, 40], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 0, 70], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 0, 10], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 0, -20], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [30, 0, 40], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 0, 10], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 0, 70], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 0, -20], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    //  // First Floor
     { position: [-30, 51, 40], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 51, 70], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 51, 10], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [-30, 51, -20], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
     { position: [30, 51, 40], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 51, 10], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 51, 70], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     { position: [30, 51, -20], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
     //Second Floor
    // { position: [-30, 103, 40], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 103, 70], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 103, 10], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 103, -20], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [30, 103, 40], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 103, 10], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 103, 70], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 103, -20], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    //Third Floor
    // { position: [-30, 152, 40], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 152, 70], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 152, 10], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 152, -20], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [30, 152, 40], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 152, 10], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 152, 70], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 152, -20], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // Fourth Floor
    // { position: [-30, 202, 40], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 202, 70], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 202, 10], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [-30, 202, -20], scale: [5, 5, 4], rotation: [0, Math.PI / 2, 0] },
    // { position: [30, 202, 40], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 202, 10], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 202, 70], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },
    // { position: [30, 202, -20], scale: [5, 5, 4], rotation: [0, -Math.PI / 2, 0] },


];
const loadStand = () => {
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/models/');

    loader.load('tablet_display_stands.glb', (gltf) => {
        // const mesh = gltf.scene.clone(); // Clone the loaded mesh
        const mesh = gltf.scene;
        mesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
  
      stands.forEach(model => {
        console.log("stands working"); 
        const clonedMesh = mesh.clone(); // Create a clone for each placement
        clonedMesh.position.set(...model.position);
        clonedMesh.scale.set(...model.scale);
        clonedMesh.rotation.set(...model.rotation);
        scene.add(clonedMesh);
      });

    }, (xhr) => {
        // console.log(`loading stand ${xhr.loaded / xhr.total * 100}%`);
    }, (error) => {
        // console.error(error);
    });
};
loadStand();


const isCameraFacingPlane = (camera, plane) => {
    const planeNormal = new THREE.Vector3(0, 0, 1);
    planeNormal.applyQuaternion(plane.quaternion);
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    return planeNormal.dot(cameraDirection) < 0.5;
    

};

const planes = [];
const frames = [
    // ground floor
    { position: { x: 30, y: 7, z: 40 }, rotation: { x: -90 * (Math.PI / 180), y: -60 * (Math.PI / 180), z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 7, z: 40 }, rotation: { x: -90 * (Math.PI / 180), y: 60 * (Math.PI / 180), z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 7, z: 10 }, rotation: { x: -90 * (Math.PI / 180), y: -60 * (Math.PI / 180), z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 7, z: 10 }, rotation: { x: -90 * (Math.PI / 180), y: 60 * (Math.PI / 180), z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 7, z: 70 }, rotation: { x: - 90 * (Math.PI / 180), y: 60 * (Math.PI / 180), z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 7, z: 70 }, rotation: { x: -90 * (Math.PI / 180), y: -60 * (Math.PI / 180), z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 7, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 7, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 15, z: 30 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 15, z: -20 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 15, z: 80 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 15, z: -20 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 15, z: 30 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 15, z: 80 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // first floor
    { position: { x: 30, y: 58, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 58, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 58, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 58, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 58, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 58, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 58, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 58, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 65, z: 30 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 65, z: -20 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 65, z: -20 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 65, z: 30 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 65, z: 80 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 65, z: 80 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // Second Floor
    { position: { x: 30, y: 110, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 110, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 110, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 110, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 110, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 110, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 110, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 110, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 115, z: 30 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 115, z: -20 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 115, z: -20 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 115, z: 30 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 115, z: 80 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 115, z: 80 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    //Third Floor
    { position: { x: 30, y: 160, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 160, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 160, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 160, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 160, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 160, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 30, y: 160, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -30, y: 160, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 165, z: 30 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 165, z: -20 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 165, z: -20 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 165, z: 30 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: 74, y: 165, z: 80 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    { position: { x: -74, y: 165, z: 80 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    //Fourth Floor
    // { position: { x: 30, y: 210, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -30, y: 210, z: 40 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    // { position: { x: 30, y: 210, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -30, y: 210, z: 10 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    // { position: { x: -30, y: 210, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    // { position: { x: 30, y: 210, z: 70 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: 30, y: 210, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: -60 * Math.PI / 180, z: -Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -30, y: 210, z: -20 }, rotation: { x: -90 * Math.PI / 180, y: 60 * Math.PI / 180, z: Math.PI / 2 }, width: 12, height: 6, borderPositionOffset: { x: 0.05, y: -0.1, z: -0.01 }, hasBorder: true },
    // { position: { x: 74, y: 215, z: 30 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: 74, y: 215, z: -20 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -74, y: 215, z: -20 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -74, y: 215, z: 30 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: 74, y: 215, z: 80 }, rotation: { x: 0, y: -0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: 0.05, y: -0.08, z: -0.01 }, hasBorder: true },
    // { position: { x: -74, y: 215, z: 80 }, rotation: { x: 0, y: 0.5 * Math.PI, z: 0 }, width: 25, height: 15, borderPositionOffset: { x: -0.05, y: -0.08, z: -0.01 }, hasBorder: true },


]

const animate = () => {
    requestAnimationFrame(animate);
    checkCameraPosition();
    renderer.render(scene, camera);
};
animate();
// (imageUrl, position, rotation, width, height, borderPositionOffset, hasBorder,slug, modalInfo, reportUrl, youtubeUrl, title)
for (let i = 0; i < data.length; i++) {
    planes.push(createImagePlaneWithBorder(data[i].imageUrl, frames[i].position, frames[i].rotation, frames[i].width, frames[i].height, frames[i].borderPositionOffset, frames[i].hasBorder, data[i].slug, data[i].modalInfo, data[i].reportUrl, data[i].youtubeUrl, data[i].title));
}
console.log(planes);
// // // Function to update planes with new data
// const updatePlanes = (data) => {
//     planes.forEach((plane, index) => {
//         if (index < data.length) {
//             const item = data[index];
//             plane.userData.title = item.title;
//             plane.userData.imageUrl = item.imageUrl;
//             plane.userDataslug = itemslug;
//             plane.userData.modalInfo = item.modalInfo;
//             plane.userData.reportUrl = item.reportUrl;
//             plane.userData.youtubeUrl = item.youtubeUrl.src;
//             const imgLoader = new THREE.TextureLoader(manager).load(item.imageUrl);
//             plane.material = new THREE.MeshBasicMaterial({map: imgLoader});
//         }

//     });
// };
// updatePlanes(data);


// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
    controls.lock();
    hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

// Hide Menu
function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
// Show Menu
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'flex';
}
controls.addEventListener('unlock', showMenu);


// Event Listener for when we press the Keys
document.addEventListener('keydown', onKeyDown, false);
// Function for Movement when we press the keys
// function onKeyDown(event) {
//     let keycode = event.which;

//     // Right Arrow Key or 'D'
//     if (keycode === 39 || keycode === 68) {
//         controls.moveRight(1);
//     }
//     // Left Arrow Key or 'A'
//     else if (keycode === 37 || keycode === 65) {
//         controls.moveRight(-1);
//     }
//     // Up Arrow Key or 'W'
//     else if (keycode === 38 || keycode === 87) {
//         controls.moveForward(1);
//     }
//     // Down Arrow Key or 'S'
//     else if (keycode === 40 || keycode === 83) {
//         controls.moveForward(-1);
//     }
// }

// Collision for lion Model
const cylinderGeometry = new THREE.CylinderGeometry(9, 9, 20, 32); // 9 is the radius and 80 is the height
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(1, 6, 32); // Same position as lion1
// scene.add(cylinderMesh);

const cylinderGeometry1 = new THREE.CylinderGeometry(9, 9, 20, 32); // 9 is the radius and 80 is the height
const cylinderMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const cylinderMesh1 = new THREE.Mesh(cylinderGeometry1, cylinderMaterial1);
cylinderMesh1.position.set(1, 62, 32); // Same position as lion1
// scene.add(cylinderMesh1);


// Function for Movement when we press the keys
function onKeyDown(event) {
    let keycode = event.which;

    // Current camera position
    const cameraPosition = camera.position.clone();

    // Calculate future camera position based on key press
    let futurePosition = cameraPosition.clone();
    if (keycode === 39 || keycode === 68) { // Right
        futurePosition.x += 1;
    } else if (keycode === 37 || keycode === 65) { // Left
        futurePosition.x -= 1;
    } else if (keycode === 38 || keycode === 87) { // Forward
        futurePosition.z += 1;
    } else if (keycode === 40 || keycode === 83) { // Backward
        futurePosition.z = 1;
    }

    // Check if the future camera position is inside the cylinder
    const futureInsideCylinder = checkCameraCollision(futurePosition);
   
    if(camera.position.x>-12 && camera.position.x<10 && camera.position.z< -46 && camera.position.y<30){
        camera.position.z = -46;  // Right side of Front Left Wall                                     
    }
    if(camera.position.x<-13 && camera.position.z<-46){
        camera.position.z = -46;  // Front Left Wall
    }
    if(camera.position.x>30 && camera.position.z<-46){
        camera.position.z = -46; // Front Right Wall
    }
    if(camera.position.x>-15 && camera.position.x<35 && camera.position.z<-120){
        camera.position.z = -120; //Front wall
    }
    if (camera.position.x > 70){
        camera.position.x = 70;  // Right wall
    }else if(camera.position.x < -70){
        camera.position.x = -70; // Left wall
    }
    if(camera.position.z>95){
        camera.position.z = 95;  //Back wall
    }
    if(camera.position.x>28 && camera.position.z <-46){
        camera.position.x = 28; // Front Plane Right wall
    }
    if(camera.position.x<-11 && camera.position.z <-46){
        camera.position.x = -11; // Front Plane Left wall
    }

    

    


    // Allow movement if the future position is not inside the cylinder
    if (!futureInsideCylinder) {
        if (keycode === 39 || keycode === 68) {
            controls.moveRight(1);
        } else if (keycode === 37 || keycode === 65) {
            controls.moveRight(-1);
        } else if (keycode === 38 || keycode === 87) {
            controls.moveForward(1);
        } else if (keycode === 40 || keycode === 83) {
            controls.moveForward(-1);
        }
    }
}

// Update checkCameraCollision to return true if camera is inside the cylinder
function checkCameraCollision(cameraPosition) {
    const dx = cameraPosition.x - cylinderMesh.position.x && cameraPosition.x - cylinderMesh1.position.x;
    const dz = cameraPosition.z - cylinderMesh.position.z && cameraPosition.z - cylinderMesh1.position.z;

    const distance = Math.sqrt(dx * dx + dz * dz);

    // Check if within cylinder's radius and height
    const withinRadius = distance <= 9; // Adjusted radius to match cylinder
    const withinHeight = cameraPosition.y >= (cylinderMesh.position.y - 10) && cameraPosition.y <= (cylinderMesh.position.y + 10) || cameraPosition.y >= (cylinderMesh1.position.y - 70) && cameraPosition.y <= (cylinderMesh1.position.y + 70); // Adjusted for cylinder height

    return withinRadius && withinHeight;
}

// Call onKeyDown function when key is pressed
document.addEventListener('keydown', onKeyDown, false);

// Function to create stairs
const createStairs = () => {
    const createStairPlane = (width, height, depth, texturePath, position, rotation) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const textureLoader = new THREE.TextureLoader(manager);
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            // color:	0xa49b97,
             side: THREE.FrontSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(...position);
        plane.rotation.set(...rotation);
        scene.add(plane);
    };

    //Ground Floor
    createStairPlane(25, 55, 2, '/../../static/assets/wall.jpg', [20, 12, -74], [-0.345 * Math.PI, 0, 0]); // Right stair
    createStairPlane(50, 28, 2, '/../../static/assets/FloorTexture/Rubber004_4K-JPG_Color.jpg', [8, 25, -110], [0.5 * Math.PI, 0, 0]); // Plane at the top
    createStairPlane(22, 55, 2, '/../../static/assets/wall.jpg', [-2, 38.5, -74], [0.34 * Math.PI, 0, 0]); // Left stair
    createStairPlane(100, 39, 2, '/../../static/assets/FloorTexture/Rubber004_4K-JPG_Color.jpg', [-1, -1, -70], [0.5 * Math.PI, 0, 0]); // Plane at the bottom
    createStairPlane(100, 39, 2, '/../../static/assets/FloorTexture/Rubber004_4K-JPG_Color.jpg', [-1, 102, -70], [0.5 * Math.PI, 0, 0]); // Plane at the top
    createStairPlane(100,39,2, '/../../static/assets/FloorTexture/Rubber004_4K-JPG_Color.jpg', [-1, 152, -70], [0.5 * Math.PI, 0, 0]); 
    
};
createStairs();


// Simulate stair climbing and descending
function updateCameraPosition() {
    const { x, z } = controls.getObject().position;

    // Define the stair boundaries for both right and left stairs
    //Ground Floor 
    const rightStairBoundaries = {
        lowerX: 8,
        upperX: 30,
        lowerZ: -90,
        upperZ: -50
    };
    const leftStairBoundaries = {
        lowerX: -15,
        upperX: 8,
        lowerZ: -110,
        upperZ: -50
    };

    // Helper to visualize the stair boundaries
    const drawBoundaries = (boundaries) => {
        const geometry = new THREE.BoxGeometry(boundaries.upperX - boundaries.lowerX, 1, boundaries.upperZ - boundaries.lowerZ);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set((boundaries.upperX + boundaries.lowerX) / 2, 0, (boundaries.upperZ + boundaries.lowerZ) / 2);
        scene.add(plane);
    };
    //GroundFloor
    //  drawBoundaries(rightStairBoundaries);
    // drawBoundaries(leftStairBoundaries);

    // Check if the camera is within the right stair boundaries
    //Ground Floor
    if (x > rightStairBoundaries.lowerX && x < rightStairBoundaries.upperX && z > rightStairBoundaries.lowerZ && z < rightStairBoundaries.upperZ && z < -50 && z > -90) {
        if (z < -115) {
            camera.position.y = 18 + ((z + 110) / 10) * 8; // Upward movement for right stairs
        } else if (z > -110) {
            camera.position.y = 13 - ((z + 50) / 10) * 5; // Downward movement for right stairs
        } 
    }
    // Check if the camera is within the left stair boundaries
    if (x > leftStairBoundaries.lowerX && x < leftStairBoundaries.upperX && z > leftStairBoundaries.lowerZ && z < leftStairBoundaries.upperZ) {
        if (z < -115) {
            camera.position.y = 65 + ((z + 110) / 10) * 8; // Upward movement for left stairs
        } else if (z > -110) {
            camera.position.y = 65 + ((z + 50) / 10) * 5; // Downward movement for left stairs
        }
    }
}

// Adjust the aspect ratio when the window is resized
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
const render = function () {
    updateCameraPosition();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();