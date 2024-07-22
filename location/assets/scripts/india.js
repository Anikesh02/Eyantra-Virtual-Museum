
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const timeline = document.getElementById("timeline");
const progressLine = document.getElementById("progress-line");
const languageElement = document.getElementById("language");
function india_translation(stateName){
  const stateLanguages={
    "IN-JK": "بھارت",
    "IN-RJ":"भारत",
    "IN-GJ":"ભરત",
    "IN-MP":"भारत",
    "IN-CT":"भारत",
    "IN-JK":"भारत",
    "IN-MH":"भरत",
    "IN-TG":"భరత్",
    "IN-KA":"ಭಾರತ",
    "IN-TN":"பாரத்",
    "IN-KL":"ഭാരതം"
  }
  return stateLanguages[stateName] || "India";
}

let currentItem = timeline.firstChild;
let prev_state ="IN-JK";
function highlightState(stateName) {
  let current_state = stateName;
  if(indiaMapLoaded){
    if(prev_state!=current_state){
      let previousMesh = indiaMap.children.find(child=>child.name===prev_state);
      previousMesh.material = state_texture;
      prev_state = current_state;
    }
   const hoveredLanguage = india_translation(stateName);
   languageElement.textContent = hoveredLanguage;
   console.log("inside highlight function", indiaMap.children.find(child=>child.name===stateName));
   const componentMesh = indiaMap.children.find(child=>child.name===stateName);
   componentMesh.material = new THREE.MeshBasicMaterial({
    color:0xE34547,
   })
   
  }
  console.log(stateName);
}

// state highlighting animation will start if user doesn't move his mouse
let intervalId = null;
let sumWidth = 0;
function startAnimation() {
  intervalId = setInterval(() => {
    const totalItems = timeline.children.length;
    
    const progressWidth =  (currentItem.clientWidth/timeline.offsetWidth)*100;
    sumWidth = sumWidth+progressWidth
    console.log("sum width",sumWidth);
    console.log(progressWidth)
    progressLine.style.width = `${sumWidth}%`;
    
  
    // currentItem.style.backgroundColor = "#007bff"; // Highlight color
    currentItem.style.color = "black"; // Text color

    highlightState(currentItem.dataset.state);

    setTimeout(() => {
      // currentItem.style.backgroundColor = ""; // Reset background color
      // currentItem.style.color = "white"; // Reset text color
      currentItem = currentItem.nextElementSibling;
      if (!currentItem) {
        clearInterval(intervalId);
        intervalId = null;
        currentItem = timeline.firstChild;
      } else {
        currentItem.style.opacity = 1; // Make the next item visible
      }
    }, 1000); // Duration for highlight
  }, 3000); // Delay between animations
}
startAnimation();

// Adding event listener for user clicks on timeline items
timeline.addEventListener("mouseover", (event) => {
  console.log(event);
  if (event.target.tagName === "LI") {
    const clickedState = event.target.dataset.state;
    if (intervalId) {
      clearInterval(intervalId);
      progressLine.style.width = 0;

      intervalId = null;
    }
    
    highlightState(clickedState);
    currentItem = event.target;
  }
});
timeline.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.tagName === "LI") {
    const clickedState = event.target.dataset.state;
    if (intervalId) {
      clearInterval(intervalId);
      progressLine.style.width = 0;

      intervalId = null;
    }
    
    showInfoDesk(clickedState);
    currentItem = event.target;
  }
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// var renderTarget = new THREE.WebGLRenderTarget(512,512);

renderer.setClearColor(0x3b657d);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// var gui = new GUI();

const directionalLight = new THREE.DirectionalLight(0x111111, 0);
directionalLight.position.set(0, 0, 10).normalize(); 
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
scene.add(ambientLight);


const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('./static/assets/indiaTexture/texture2.jpg');
backgroundImage.wrapS = THREE.RepeatWrapping;
backgroundImage.wrapT = THREE.RepeatWrapping;
backgroundImage.repeat.set( 1, 1 );

const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {side: THREE.BackSide,map:backgroundImage} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x=Math.PI/2;
plane.scale.set(10,10,10);
scene.add( plane );


// Applying texture to each state of India
let state_texture;
textureLoader.load("./static/assets/indiaTexture/texture5.jpg", (texture) => {
  state_texture = new THREE.MeshBasicMaterial({
    map: texture,
    side:THREE.DoubleSide,
  });
  console.log("state_texture", state_texture);
});

const orbit = new OrbitControls(camera, renderer.domElement);


// Loading India Map
const monkeyUrl = new URL("india_try19.glb", import.meta.url);
const loader = new GLTFLoader();
let indiaMapLoaded = false;
let indiaMap;
let children;
loader.load(monkeyUrl.href, function (glb) {
  indiaMap = glb.scene;
  indiaMap.position.set(0, 0, -0.5);
  indiaMap.scale.set(4, 4, 4);

  // Extracting children of India map to apply clickable event listener, when the user clicks on state of India info desk should open(here childrens are the states of india)
  children = indiaMap.children;
  console.log(children);
  children.forEach((child)=>{
    child.material = state_texture;
  })
  indiaMapLoaded = true;
  scene.add(indiaMap);
});

// Applying mousemove event listener to states of india, when user hovers over particular state it should get highlighted
const raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener("mousemove", (event) => {
  event.stopPropagation();
  if (event.type === "click") {
    console.log("working");
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(mouse, camera);
  let hoveredMesh = null;

  children.forEach((child) => {
    
    if (child instanceof THREE.Mesh ) {
     
      const intersects = raycaster.intersectObject(child, true);
      if (intersects.length > 0) {
        hoveredMesh = child;
        // if (intervalId) {
        //   clearInterval(intervalId);
        //   intervalId = null;
        // }
        child.material = new THREE.MeshBasicMaterial({
          color: 0xE34547,
          // emissive: 0xff0000,
        });
        // child.scale.y =3 ;
        console.log(child.scale.y);
        const hoveredLanguage = india_translation(child.name);
        languageElement.textContent = hoveredLanguage;
      } else {
        child.material =state_texture;
        // new THREE.MeshBasicMaterial({
        //   color:0xD2EAF6
        // });
        child.scale.y = 1;
      }
    }
  });
});  

// Applying clickable event listener to states of India, when user clicks over particular state info desk should appear(which shows artifacts of that state)
renderer.domElement.addEventListener("click", (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  
  raycaster.setFromCamera(mouse, camera);
  children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const intersects = raycaster.intersectObject(child, true);
      if (intersects.length > 0) {
        
        console.log("child inside click event", child);
        showInfoDesk(child.name);
        

        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
       
      }
    }
  });
});

// Storing states data which will be used in Info Desk
const statesData = {
  "IN-AN":{
    name:"Andaman and Nicobar",
    capital:"(Port Blair)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-AP":{
    name:"Andhra Pradesh",
    capital:"(Amaravati)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-AR":{
    name:"Arunachal Pradesh",
    capital:"(Itanagar)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-AS":{
    name:"Assam",
    capital:"(Dispur)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-BR":{
    name:"Bihar",
    capital:"(Patna)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/bihar_map.jpeg"
  },
  "IN-CH":{
    name:"Punjab",
    capital:"(Chandigarh)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-CT":{
    name:"Chhattisgarh",
    capital:"(Raipur)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-DH":{
    name:"Dādra and Nagar Haveli and Damān and Diu",
    capital:"(Raipur)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-DL":{
    name:"New Delhi",
    capital:"(Raipur)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-GA":{
    name:"Goa",
    capital:"(Panaji)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-GJ":{
    name:"Gujarat",
    capital:"(Gandhinagar)",
    artifacts:[
      "Kutch Museum ",
      "Calico Museum of Textiles",
      "Baroda Museum and Picture Gallery ",
      "Junagadh Museum ",
      "Lakhota Place and Museum ",
      "Sardar Vallabhbhai Patel Museum ",
      "Bharatiya Sanskruti Darshan Museum ",
      "Watson Museum",
      "Lady Wilson Museum",
      "Prabhaspatan Museum"
    ],
    image:"./static/assets/stateMaps/gujarat_map.png"
  },
  "IN-HP":{
    name:" Himachal Pradesh",
    capital:"(Panaji)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-HR":{
    name:" Haryana",
    capital:"(Chandigarh)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-JH":{
    name:" Jharkhand",
    capital:"(Ranchi)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/jharkhand_map.png"
  },
  "IN-JK":{
    name:"Jammu and Kashmir",
    capital:"(Srinagar)",
    artifacts:[
      "SPS Museum",
      "Dogra Art Museums",
      "Crafts Museum ",
      "Munshi Aziz Bhat Museum of Central Asian and Kargil Trade Artefacts",
      "Central Asian Museum",

    ],
    image:"./static/assets/stateMaps/jammuKashmir_map.jpeg"
  },
  "IN-KA":{
    name:"Karnataka",
    capital:"(Bengaluru)",
    artifacts:[
      "Government Museum ",
      "Government Museum, Wellington House",
      "Sri Chamarajendra Memorial, GOvernment Museum ",
      "Government Museum, Hassan",
      "Government Museum, Madikeri ",
      "Hasta Shilpa Heritage Village  Museum ",
      "Regional Museum of Natural History ",
      " Folklore Museum",
      "Jaganmohan Palace Museum "

    ],
    image:"./static/assets/stateMaps/karnataka.jpg"
  },
  "IN-KL":{
    name:"Kerala",
    capital:"(Thiruvananthapuram)",
    artifacts:[
      "Archaeological Museum, Thrissur ",
      "Pazhassi Raja Archaeological Museum",
      "Pazhassi Kudeeram, Mananthavady",
      "The Museum of Kerala History ",
      "Napier Museum ",
      "Hill Palace Museum ",
      "Wayanad Heritage Museum ",
      "Vaidyaratnam Museum ",
      "Tea Musuem "

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-MH":{
    name:"Maharashtra",
    capital:"(Mumbai)",
    artifacts:[
      "Chhatrapati Shivaji Maharaj Vastu Sangrahalay",
      "Dr. Bhau Daji Lad Museum ",
      "RBI Monetary Museum ",
      "Shanti - Krishna Museum of Money and History  ",
      "Gargoti - The Mineral Museum ",
      "Raja Dinkar Kelkar Museum ",
      "National Museum of Indian Cinema",
      "Chhatrapati Shivaji maharaj Museum"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-ML":{
    name:"Meghalaya",
    capital:"(Shillong)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-MN":{
    name:"Manipur",
    capital:"( Imphal)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-MP":{
    name:"Madhya Pradesh",
    capital:"(Bhopal)",
    artifacts:[
      "State Museum Bhopal ",
      "Central Museum, Indore",
      "Rani Durgawati Museum ",
      "Tulsi Museum ",
      "Maharaja Chhatrasal Museum ",
      "Gujri Mahal Museum ",
      "Triveni Museum",
      "District Archaeological Museum, Vidisha",
      "Yashodharman Museum",
      "District Archaeological Museum, Dhar ",
      "District Archaeological Museum, Mandla",
      "Tirthankar Mahavir District Museum",
      "Government Museum, Maheswar","Archaeological Museum, Raisen "


    ],
    image:"./static/assets/stateMaps/madhyaPardesh_map.png"
  },
  "IN-MZ":{
    name:"Mizoram",
    capital:"(Bhopal)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-NL":{
    name:"Nagaland",
    capital:"(Kohima)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-OR":{
    name:"Odisha",
    capital:"(Bhubaneswar)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-PB":{
    name:"Punjab",
    capital:"(Chandigarh)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-RJ":{
    name:"Rajasthan",
    capital:"(Jaipur)",
    artifacts:[
      "Albert Hall Museum",
      "Government Museum Ahar ",
      "Governmnet Museum Bundi",
      "Fateh Prakash Palace",
      "Rajmata Devendra Kunwar State Museum State & culture Centre",
      "Government Museum Jaisalmer",
      "Government Museum Jhalawar"

    ],
    image:"./static/assets/stateMaps/rajasthan_map.jpeg"
  },
  "IN-SK":{
    name:"Sikkim",
    capital:"(Gangtok)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-TG":{
    name:"Telangana",
    capital:"(Hyderabad)",
    artifacts:[
      "Warangal Museum ",
      "Chowmahalla Palace ",
      "Jagdish and Kamala Mittal Museum of Indian Art",
      "Railway Museum ",
      "Birla Science Museum ",
      "Khazana Building Archaeological museum ",
      "Archaeological Museum, Kondapur"

    ],
    image:"./static/assets/stateMaps/telangana_map.png"
  },
  "IN-TN":{
    name:"Tamil Nadu",
    capital:"(Chennai)",
    artifacts:[
      "Government Museum Chennai",
      "Dakshina Chitra ",
      "Chennai Rail Museum",
      "Indian Seashell Museum ",
      "The Fort Museum",
      "Government Museum Pudukkottai",
      "Railway Heritage Centre",
      "Government Museum, Erode",
      "Government Museum, Karur",
      "Dr. Arun's Photography & Vintage Camera Museum",
      "Archeological Survey of India Museum",
      "Tiruchirapalli District Museum",
      "Danish Fort Museum",
      "Coimbatore site museum",
      "Hero Stones Site Museum ",
      "Chera Site Museum ",
      "Courtalam Site Museum ",
      "Rajarajan Site Museum "

    ],
    image:"./static/assets/stateMaps/tamilNadu_map.png"
  },
  "IN-UP":{
    name:"Uttar Pradesh",
    capital:"(Dehradun)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-UT":{
    name:"Uttarakhand",
    capital:"(Dehradun)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },
  "IN-WB":{
    name:"West Bengal",
    capital:"(Kolkata)",
    artifacts:[
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves",
      "Ajanta Caves",
      "Ellora Caves"

    ],
    image:"./static/assets/stateMaps/maharashtra_map.jpg"
  },

}
// info desk
const infoDeskElement = document.getElementById('info-desk');
const closeInfoDeskButton = document.getElementById("go-back");
const goMuseumButton = document.getElementById("go-museum");
const imageElement = document.getElementsByClassName("state-image")[0];
console.log("info desk image",imageElement);
var navigationUrl = "";
function showInfoDesk(stateName){
  navigationUrl = stateName;
  const stateNameElement = document.getElementById('state-name');
  const capitalElement = document.getElementById('capital');
  const artifactsListElement = document.querySelector('.artifacts-list');
  stateNameElement.textContent = statesData[stateName].name;
  capitalElement.textContent = statesData[stateName].capital;
  imageElement.src = statesData[stateName].image;
  console.log("info desk image",imageElement);
  console.log(" statesData[stateName].name", statesData[stateName].name);
  console.log(" statesData[stateName].capital",statesData[stateName].capital);
  artifactsListElement.innerHTML = '';
  // statesData[stateName].artifacts.forEach(artifact=>{
  //   const listItem = document.createElement('li');
  //   listItem.textContent = artifact;
  //   artifactsListElement.appendChild(listItem);

  // })
  artifactsData.forEach((item)=>{
    if(item.stateCode == stateName){
      const listItem = document.createElement('li');
      listItem.textContent = item.title;
      artifactsListElement.appendChild(listItem);
    }
  })
  infoDeskElement.classList.remove('hidden');
  infoDeskElement.classList.add('visible');
}

closeInfoDeskButton.addEventListener("click",()=>{
  infoDeskElement.classList.add("hidden");
  infoDeskElement.classList.remove('visible');
})
goMuseumButton.addEventListener("click",(event)=>{
  console.log("state clicked",event);
  window.location.href = "indiaLobby/"+navigationUrl;
})
camera.position.set(-1.4240104792773967, 1.427113086886674, 0.8510387236093673);
orbit.update();
orbit.enabled = false;


function animate() {
  // orbit.update();
  // console.log(camera.position);
  // compose.render(scene, camera)  
  // renderer.render(backgroundMesh,new THREE.Scene());
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
