e-Yantra 2024


# 3D Metaverse Virtual Museum Competition

##### Anikesh Kulal
##### Akshit Garg
##### Mentor Name - Premkumar S, Deepa Avudiappan
##### Duration of Internship: 27/06/2024 − 19/07/2024


## Setup

#### Fetching git code to local system:
- Clone the repository from GitHub:
    ```
    git clone https://github.com/eYSIP-2024/24_metaverse_museum.git
    ```
- Setup a virtual environment
  ```
  python -m venv env
  ```
#### Install dependencies
- Install `node` and `npm` from [official website](https://nodejs.org).
- Install `python` from [official website](https://www.python.org/downloads/).
- After installing python install django: 
    ```
    pip install django
	```

- Change current working directory to Project directory
    ```
    cd location
    ```
- Install `npm` dependencies after changing working directory to `location`: 
    ```
    npm install
    ```
- After installing dependencies run:
    ```
    npm run dev
    ```
#### In another terminal, run the django server (Don't cd location in this terminal):

  ```
  python manage.py runserver
  ```
  	
  	
#### Add uploads folder:
> The uploads file structure should be like this:
> 
 ![image](https://github.com/user-attachments/assets/fb4b734c-91e3-4a9e-9f6a-ad5fcdcfb77d)

 ## Abstract
 
The e-Yantra Virtual Museum is an engaging online platform showcasing India's rich cultural heritage. It features interactive maps, detailed exhibits, a dynamic lobby, and edition-wise and state-wise artifacts for an immersive experience. Users can explore artifacts, learn regional traditions, and visit 3D models built by students. The platform includes user authentication and quizzes to enhance interaction and engagement, leveraging modern web technologies to make cultural education accessible and enjoyable globally.

## Completion status
Features successfully implemented are: 

- Created an interactive India map: Clicking a state takes user to a virtual museum specific to that region.
- Dynamic Lobby: Adding new artifacts to database automatically populates them in the museum lobby.
- Info Desk through which user can get the info of any artifact.
- Users can select any artifact from the set of images in musuem and position themselves directly in front of it for a closer look.
- Edition-wise Artifacts: Users can visit edition-wise lobby
- State-wise Artifacts: After selecting any state from India map, user will be able to see artifacts with respect to particular state in the lobby.

- Interactive Quiz: Amazing and fun quizzes to enhance user interactions and engagement.

## Tech Stack

- THREE.js
- Node.js
- MySQL
- Django
- HTML
- CSS

## Admin Side
 - Add/Edit/Delete Artifacts: Interface to manage artifact details such as name, description, images, and associated multimedia.
 - Artifact Categorization:  Categorize artifacts by country, state, and edition for easier navigation and management.
 - Adding Quiz Questions and Answers with images.
 - Authentication : Role based authentication for user and admin

## Pages

👉 Landing Page

👉 India map

👉 Register Page

👉 Login Page

👉 Common Lobby

👉 Dynamic Lobby

👉 State-wise Lobby

👉 Edition-wise Lobby

👉 Interactive Quiz
 
👉 Model Page

👉 Admin 

## Landing Page
⭐ Header Section

   The header section includes the navigation bar and logo. It also contains links for different sections of the website and user authentication options.
   ```
    <header>
        <img class="logoSize" src="static/assets/landingImgs/logo.png" alt="">
        <ul class="navbar">
            <li><a href="#">Home</a></li>
            <li><a href="{% url 'indiaMap' %}">Map</a></li>
            <li><div class="dropdown">
                <button class="dropbtn">Edition</button>
                <div class="dropdown-content">
                  <a href="{% url 'edition' 1 %}">Edition 1</a>
                  <a href="{% url 'edition' 2 %}">Edition 2</a>
                  <a href="{% url 'edition' 3 %}">Edition 3</a>
                  <a href="{% url 'edition' 4 %}">Edition 4</a>
                </div>
              </div>
            </li>
            <li><a href="{% url 'quiz' %}">Quiz</a></li>
            {% if not user.is_authenticated %}
            <li><a href="{% url 'register' %}">Register</a></li>
            <li><a href="{% url 'login' %}">Login</a></li>
            {% endif%}
            {% if user.is_authenticated%}
            <li><a href="{% url 'logout' %}">Logout</a></li>
            {% endif%}
        </ul>
        <div class="h-right">
            <a href="#">Follow us</a>
            <a href="#"><i class="ri-instagram-line"></i></a>
            <a href="#"><i class="ri-twitter-x-line"></i></a>
            <a href="#"><i class="ri-facebook-fill"></i></a>
            <div class="bx bx-menu" id="menu-icon"></div>
        </div>
    </header>
   ```

⭐ Home Section

The home section introduces the virtual museum with a title, subtitle, and a call-to-action button. It also includes a background video.
```
<section class="home">
    <div class="home-text">
        <h1>e-Yantra Virtual Museum</h1>
        <h3>"Built by Students, For Students"</h3>
        <a href="{% url 'commonLobby' %}" class="btn" style="z-index: 1000;">Explore</a>
        <video id="homeVideo" autoplay muted loop>
            <source src="static/assets/videos/vmc_back.mp4" type="video/mp4">
        </video>
    </div>
</section>
```

⭐ Feature Section

This section highlights the key features of the virtual museum, such as the virtual museum, locations, and artifact gallery.
```
<section class="feature">
    <h1 style="color: #C80036; text-align: center; font-size: 62px; margin-bottom: 40px;">Features of our Museum</h1>
    <div class="feature-content">
        <div class="row">
            <div class="row-img">
                <img src="static/assets/landingImgs/threeArtifacts.png" alt="">
            </div>
            <h4 style="font-weight: bold;">Virtual Museum</h4>
        </div>
        <div class="row">
            <div class="row-img">
                <img src="static/assets/landingImgs/map.png" alt="">
            </div>
            <h4 style="font-weight: bold;">Our Locations</h4>
        </div>
        <div class="row">
            <div class="row-img">
                <img src="static/assets/landingImgs/infodesk.png" alt="">
            </div>
            <h4 style="font-weight: bold;">Artefact Gallery</h4>
        </div>
    </div>
</section>
```

⭐ JavaScript for Interactive Elements

Adds interactivity to the header and navigation menu, making the header sticky on scroll and toggling the menu on click.
```
<script>
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 60);
    });

    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    }
</script>
```
## India map

Route: `/india`

⭐ Display State Info

This function updates the info desk with the selected state's information, including its name, capital, image, and artifacts. It then makes the info desk visible.

```
function displayStateInfo(stateId) {
  const stateInfo = artifactsData[stateId];
  document.getElementById('state-name').innerText = stateInfo.name;
  document.getElementById('capital').innerText = `(${stateInfo.capital})`;
  document.querySelector('.state-image').src = stateInfo.image;
  document.querySelector('.artifacts-list').innerHTML = stateInfo.artifacts.map(artifact => `<li>${artifact}</li>`).join('');
  document.getElementById('info-desk').classList.remove('hidden');
}
```

⭐ Timeline Click Event

This code adds a click event listener to each state in the timeline. When a state is clicked, it calls the displayStateInfo function to update the info desk with the selected state's information.

```
document.querySelectorAll('#timeline li').forEach(item => {
  item.addEventListener('click', event => {
    const stateId = event.target.getAttribute('data-state');
    displayStateInfo(stateId);
  });
});
```
⭐ Go Back Button

This code adds a click event listener to the "Go Back" button. When the button is clicked, it hides the info desk by adding the 'hidden' class.

```
document.getElementById('go-back').addEventListener('click', () => {
  document.getElementById('info-desk').classList.add('hidden');
});
```
⭐ Go to Museum Button

This code adds a click event listener to the "Go to Museum" button. When the button is clicked, it redirects the user to the museum page.

```
document.getElementById('go-museum').addEventListener('click', () => {
  window.location.href = '/museum';
});
```

## Register and Login Page
The Login and Register template provides a unified interface for both login and registration forms. Depending on the context variable page, it dynamically displays either the login or registration form. The login form includes fields for username and password, while the registration form utilizes Django's form rendering. Both forms are styled with a consistent CSS to ensure a cohesive user experience. Links are provided to switch between the login and registration pages, enhancing user navigation.

⭐ Register

Route: `/register`
```
{% if page != 'login' %}
<div class="container">
  <h1>REGISTER</h1>
  <div class="form-container">
    <form method="POST" action="">
      {% csrf_token %}
      {{ form.as_p }}
      <input type="submit" value="Register" class="login-button">
    </form>
    <p class="check">Already Registered?</p>
    <a href="{% url 'login' %}">Login</a>
  </div>
</div>
{% endif %}
```
⭐ Login

Route: `/login`
```
{% if page == 'login' %}
<div class="container">
  <h1>LOGIN</h1>
  <div class="form-container">
    <form method="POST" action="">
      {% csrf_token %}
      <label>Username:</label>
      <input type="text" name="username" placeholder="Enter username">
      <label>Password:</label>
      <input type="password" name="password" placeholder="Enter password">
      <input type="submit" value="Login" class="login-button">
    </form>
    <p class="check">Haven't signed up yet?</p>
    <a href="{% url 'register' %}">Sign Up</a>
  </div>
</div>
{% endif %}
```
## Common Lobby
Route: `/commonLobby`

⭐ Functions:

➡️ `createFloor()`:
The createFloor function generates a floor plane in the 3D scene using a specified texture. It sets up the geometry, loads the texture, and applies it to the material. The floor is then positioned and added to the scene.
```
const createFloor = (texturePath, yPos) => {
    const planeGeometry = new THREE.PlaneGeometry(150, 150, 10);
    const textureLoader = new THREE.TextureLoader(manager);
    const floorTexture = textureLoader.load(texturePath);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({
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
```
➡️ `loadModel()`: 
The loadModel function loads a 3D model in GLTF format into the scene. It uses the GLTFLoader and DRACOLoader to decode and load the model, then positions, scales, and rotates it before adding it to the scene.
```
const loadModel = (modelName, position, scale, rotation) => {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager).setPath('/../../static/assets/compressedModels/');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);
    loader.load(`${modelName}.glb`, (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(...position);
        mesh.scale.set(...scale);
        mesh.rotation.set(...rotation);
        scene.add(mesh);
    });
};
```
➡️ `Q_Key()`: 
The Q_key function sets up an event listener for the 'Q' key to open a floor selection modal. It defines functions to open and close the modal and to set the camera height based on the selected floor.
```
const Q_key = () => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Q' || event.key === 'q') {
            openFloorSelectionModal();
        }
    });
    const floorSelectionModal = document.getElementById("floorSelectionModal");
    const floorSelectionClose = document.getElementById("floorSelectionClose");

    function openFloorSelectionModal() {
        floorSelectionModal.classList.add('show');
    }
    floorSelectionClose.onclick = function () {
        floorSelectionModal.classList.remove('show');
    }
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
```
➡️ `createImagePlaneWithBorder`: 
The createImagePlaneWithBorder function creates an image plane with an optional border. It loads the image texture, creates the plane geometry and material, and positions the plane in the scene. If a border is specified, it creates and positions the border around the image plane.
```
const createImagePlaneWithBorder = (imageUrl, position, rotation, width, height, borderPositionOffset, hasBorder, slug, modalInfo, reportUrl, youtubeUrl, title) => {
    const textureLoader = new THREE.TextureLoader(manager);
    const imageTexture = textureLoader.load(imageUrl);
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ map: imageTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(rotation.x, rotation.y, rotation.z);
    scene.add(plane);

    if (hasBorder) {
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
```
➡️ `isCameraFacingPlane()`: 
The isCameraFacingPlane function checks if the camera is facing a given plane. It calculates the normal vector of the plane and the direction vector of the camera, then checks the dot product to determine if the camera is facing the plane.
```
const isCameraFacingPlane = (camera, plane) => {
    const planeNormal = new THREE.Vector3(0, 0, 1);
    planeNormal.applyQuaternion(plane.quaternion);
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    return planeNormal.dot(cameraDirection) < 0.5;
};
```
➡️ `checkCameraPosition()`:
The checkCameraPosition function checks the camera's position relative to the planes in the scene. If the camera is close to and facing a plane, it displays a modal with information about the plane. The modal includes an image, title, description, and links.
```
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
            modalImage.src = plane.userData.imageUrl;
            modalLink.href = plane.userData.slug;
            modalTitle.innerText = plane.userData.title;
            modalDescription.innerText = plane.userData.modalInfo;
            downloadPaperButton.onclick = () => {
                window.location.href = plane.userData.reportUrl;
            };
            youtube.href = plane.userData.youtubeUrl;
        }
    });
    if (modalVisible) {
        modal.classList.add('show');
        modal.style.pointerEvents = 'auto';
    } else {
        modal.classList.remove('show');
        modal.style.pointerEvents = 'none';
    }
};
```
➡️ `P key functionality`:
In commonlobby.js, pressing the 'P' key triggers the showSelectionModal function, which creates and displays a modal window. This modal contains a selection of images representing different planes in the 3D scene. Each image is clickable and navigates the camera to the corresponding plane. The modal can be closed by clicking the "Close" button. This functionality allows users to quickly navigate to different parts of the scene by selecting from a visual menu.
```
document.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key === 'P') {
        showSelectionModal();
    }
});

const showSelectionModal = () => {
    
    selectionModalClose.onclick = () => {
        document.body.removeChild(selectionModal);
    };
    selectionModal.appendChild(selectionModalClose);

    planes.forEach((plane, index) => {
        // Refer source code 
        };
    });

    document.body.appendChild(selectionModal);
};
```
## Dynamic Lobby

⭐ Core Functionalities :

  - Creating Image Planes with Borders
  -  Navigating to Specific Image Planes
  -  Checking Camera Position and Displaying Modals
  -  Loading 3D Models of Stands
  - Creating and Managing Spotlights
  -  Creating Walls and Floors
  - Stairs Logic

#### Functions: 
➡️ `createImagePlaneWithBorder`: 
The createImagePlaneWithBorder function creates an image plane with an optional border. It loads the image texture, creates the plane geometry and material, and positions the plane in the scene. If a border is specified, it creates and positions the border around the image plane.
```
const createImagePlaneWithBorder = (imageUrl, position, rotation, width, height, borderPositionOffset, hasBorder, slug, modalInfo, reportUrl, youtubeUrl, title) => {
    const textureLoader = new THREE.TextureLoader(manager);
    const imageTexture = textureLoader.load(imageUrl);
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ map: imageTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(rotation.x, rotation.y, rotation.z);
    scene.add(plane);

    if (hasBorder) {
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
```
➡️ `navigateToImage()`:
The navigateToImage function in commonlobby.js allows the camera to navigate to a specific image plane in the 3D scene. It calculates the new camera position based on the target plane's position and rotation, and then updates the camera's position and orientation to focus on the target plane. This function is typically called when an image in the selection modal is clicked, providing a smooth transition to the selected plane.
```
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
```
➡️ `createStairs()`:
Tthe createStairs function is used to create stair structures in the 3D scene. It defines the geometry, texture, and position for each stair plane and adds them to the scene. The updateCameraPosition function simulates the camera's movement when climbing or descending the stairs. It checks the camera's position relative to the defined stair boundaries and adjusts the camera's height accordingly to simulate the stair climbing and descending effect. 
```
const createStairs = () => {
    const createStairPlane = (width, height, depth, texturePath, position, rotation) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const textureLoader = new THREE.TextureLoader(manager);
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            side: THREE.FrontSide 
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(...position);
        plane.rotation.set(...rotation);
        scene.add(plane);
    };

    // Ground Floor
    createStairPlane(25, 55, 2, '/../../static/assets/wall.jpg', [20, 12, -74], [-0.345 * Math.PI, 0, 0]); // Right stairs
    ....
};
createStairs();
function updateCameraPosition() {
    const { x, z } = controls.getObject().position;

    // Define the stair boundaries for both right and left stairs
    const rightStairBoundaries = {
        lowerX: 8,
        upperX: 30,
        lowerZ: -90,
        upperZ: -50
    };

    // Check if the camera is within the right stair boundaries
    if (x > rightStairBoundaries.lowerX && x < rightStairBoundaries.upperX && z > rightStairBoundaries.lowerZ && z < rightStairBoundaries.upperZ) {
        if (z < -115) {
            camera.position.y = 14 + ((z + 115) / 10) * 8; // Upward movement for right stairs
        } else if (z > -115) {
            camera.position.y = 14 - ((z + 50) / 10) * 5; // Downward movement for right stairs
        } else if (z < -115) {
            camera.position.y = 80; // Stable height at the top of the right stairs
        } else {
            camera.position.y = 50; // Stable height at the bottom of the right stairs
        }
    }
}
```
## State-wise Lobby

Route: `/indiaLobby/IN-MH`  (If state is Maharashtra)

⭐ Core Functionalities:

➡️ `indiaLobby()` :

To display filtered exhibition entries in the indiaMuseum.html template, the process involves fetching all Exhibition_Entry objects from the database, then filtering these entries by state_code to match the desired criteria. After filtering, construct a list of dictionaries, where each dictionary contains relevant details about an exhibit, such as its name, description, and image URL. This list is then converted to JSON format. Finally, pass this JSON data to the indiaMuseum.html template, ensuring that the frontend can dynamically render the filtered exhibition entries based on the provided state_code. This approach allows for a flexible and dynamic display of exhibition content tailored to user preferences or specific criteria.
```
def indiaLobby(request, state_code):
    exhibition_entries = Exhibition_Entry.objects.all()
    data = []
    for exhibit in exhibition_entries:
        exhibit_code = exhibit.country + '-' + exhibit.state
        if exhibit_code == state_code:
            data.append({
                "title": exhibit.title,
                "username": exhibit.username,
                "slug": exhibit.slug,
                "modelLink": exhibit.model_link,
                "poster": exhibit.poster.url,
                "imageUrl": exhibit.exhibition_front_view.url,
                "modalInfo": exhibit.description,
                "youtubeUrl": exhibit.explanation_video_link,
                "reportUrl": exhibit.research_paper_link,
                "exhibit_model": exhibit.exhibit_model.url,
                "team_members": exhibit.team_members,
                "school_name": exhibit.school_name,
                "is_verified": exhibit.is_verified,
                "country": exhibit.country,
                "state": exhibit.state,
            })
    dataJSON = dumps(data)
    return render(request, './indiaMuseum.html', context={"data": dataJSON})
```

➡️ Upon the DOM's completion of loading, the script parses JSON data embedded within the HTML to extract exhibit information. For each exhibit, it dynamically creates HTML elements, encapsulating details like images and titles. These newly formed elements are then appended to a designated container within the HTML, effectively populating the webpage with exhibit data in a structured and visually appealing manner. This process ensures that each exhibit is represented on the page, allowing users to browse through them seamlessly.
```
document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(document.getElementById('exhibit-data').textContent);
    const exhibitContainer = document.getElementById('exhibit-container');

    data.forEach(exhibit => {
        const exhibitElement = document.createElement('div');
        exhibitElement.className = 'exhibit';

        exhibitElement.innerHTML = `
            <h2>${exhibit.title}</h2>
            <img src="${exhibit.imageUrl}" alt="${exhibit.title}">
            <p>${exhibit.modalInfo}</p>
            <a href="${exhibit.modelLink}">View Model</a>
        `;

        exhibitContainer.appendChild(exhibitElement);
    });
});
```

## Edition-wise Lobby
Route: `/edition/[editionNo]/` (Example: /edition/1/)


⭐ Core Functionalities: 

➡️ `edition()`:

This function handles the logic for displaying exhibition entries filtered by a specific edition. It fetches all entries, filters them by the provided edition 1,2,3,4 and so on and then serializes the data to JSON format to be rendered in the template.
```
def edition(request, pk):
    print(pk, 'edition is working')
    exhibition_entries = Exhibition_Entry.objects.all()
    data = []
    for exhibit in exhibition_entries:
        if str(pk) == exhibit.edition:
            exhibit_data = {
                "title": exhibit.title,
                "username": exhibit.username,
                "slug": exhibit.slug,
                "modelLink": exhibit.model_link,
                "poster": exhibit.poster.url,
                "imageUrl": exhibit.exhibition_front_view.url,
                "modalInfo": exhibit.description,
                "youtubeUrl": exhibit.explanation_video_link,
                "reportUrl": exhibit.research_paper_link,
                "exhibit_model": exhibit.exhibit_model.url,
                "team_members": exhibit.team_members,
                "school_name": exhibit.school_name,
                "is_verified": exhibit.is_verified,
                "country": exhibit.country,
                "state": exhibit.state,
                "edition": exhibit.edition
            }
            if exhibit.is_verified:
                data.insert(0, exhibit_data)
            else:
                data.append(exhibit_data)
    dataJSON = dumps(data)
    return render(request, './edition.html', context={"data": dataJSON})
 ```
 ➡️ The JavaScript file is responsible for fetching and displaying the exhibition entries for a specific edition. It likely makes an AJAX call to the edition view and dynamically updates the HTML content based on the response.
```
document.addEventListener('DOMContentLoaded', function() {
    const edition = document.getElementById('edition').value;
    fetch(`/edition/${edition}/`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('exhibition-container');
            data.forEach(exhibit => {
                const exhibitElement = document.createElement('div');
                exhibitElement.innerHTML = `
                    <h2>${exhibit.title}</h2>
                    <img src="${exhibit.poster}" alt="${exhibit.title}">
                    <p>${exhibit.modalInfo}</p>
                    <a href="${exhibit.modelLink}">View Model</a>
                `;
                container.appendChild(exhibitElement);
            });
        })
        .catch(error => console.error('Error fetching exhibition data:', error));
});
```

## Interactive Quiz
Route: `/quiz`

⭐ Functions: 

➡️ `handleQuestions()`: This function ensures that a random set of questions is selected for each quiz session, preventing repetition and ensuring variety.
```
function handleQuestions() { 
    while (shuffledQuestions.length <= 23) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}
```
➡️ `NextQuestion()`: This function updates the HTML elements to show the current question and its options, ensuring the user sees the correct content.
```
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementsByClassName("artifact-image")[0].src = currentQuestion.image;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    document.getElementsByClassName("explanation")[0].innerHTML = "";
}
```
➡️ `checkForAnswer()`: This function verifies the user's selected answer, updates the background color of the options to indicate correctness, and displays the explanation for the correct answer.
```
function checkForAnswer() {
    resetOptionBackground();
    const currentQuestion = shuffledQuestions[indexNumber];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id;
        }
    });

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green";
            document.getElementsByClassName("explanation")[0].innerHTML = currentQuestion.explanation;
            indexNumber++;
            setTimeout(() => { questionNumber++; }, 1000);
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id;
            document.getElementById(wrongLabelId).style.backgroundColor = "red";
            document.getElementById(correctOption).style.backgroundColor = "green";
            document.getElementsByClassName("explanation")[0].innerHTML = currentQuestion.explanation;
            wrongAttempt++;
            indexNumber++;
            setTimeout(() => { questionNumber++; }, 1000);
        }
    });
}
```

## Model Page
Route: `/modelPage/id`

➡️ `Video Element:` The video element is used to display a background video that plays as the user scrolls. The src attribute dynamically loads the video file associated with the exhibit.
```
<video id="v0" tabindex="0" autobuffer="autobuffer" preload="preload" style="z-index:-99;">
    <source type="video/mp4" src="/uploads/{{Exhibit.animation_video}}">
</video>
```
➡️ `JavaScript for Loader and Video Scroll:` This script hides the loader after 5 seconds and synchronizes the video playback with the user's scroll position. The scrollPlay function updates the video's current time based on the scroll position, creating a seamless scrolling animation effect.
```
<script>
    setTimeout(() => {
        let loader = document.querySelector('.loader');
        loader.style.display = 'none';
    }, 5000);

    var frameNumber = 0,
        playbackConst = 250,
        setHeight = document.getElementById("set-height"),
        vid = document.getElementById('v0');

    vid.addEventListener('loadedmetadata', function () {
        setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
    });

    function scrollPlay() {
        var frameNumber = window.pageYOffset / playbackConst;
        vid.currentTime = frameNumber;
        window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
</script>
```

## Admin Page
Route: `/admin`

⭐ Exhibition_Entry Admin:

- list_display: Shows specific fields in the list view.
- search_fields: Enables search functionality on specified fields.
- list_filter: Adds filter options in the admin sidebar.
- readonly_fields: Makes certain fields read-only.
- fieldsets: Organizes fields into sections for better UI.
⭐ Question Admin:

- list_display: Displays the question text in the list view.
- search_fields: Allows searching by question text.
- list_filter: Adds filtering options for questions.
⭐ Choice Admin:

- list_display: Shows question, choice text, position, and correctness in the list view.
- search_fields: Enables search by choice text.
- list_filter: Adds filtering options for questions and correctness.
```
from django.contrib import admin
from .models import Exhibition_Entry, Question, Choice

@admin.register(Exhibition_Entry)
class ExhibitionEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'country', 'state', 'edition', 'is_verified')
    search_fields = ('title', 'username', 'school_name')
    list_filter = ('country', 'state', 'edition', 'is_verified')
    readonly_fields = ('slug', 'model_link', 'front_view_preview')
    fieldsets = (
        (None, {
            'fields': ('title', 'username', 'country', 'state', 'edition', 'description', 'team_members', 'school_name', 'is_verified')
        }),
        ('Media', {
            'fields': ('poster', 'exhibition_front_view', 'explanation_video_link', 'research_paper_link', 'animation_video', 'exhibit_model')
        }),
        ('Auto-generated', {
            'fields': ('slug', 'model_link', 'front_view_preview')
        }),
    )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question',)
    search_fields = ('question',)
    list_filter = ('question',)

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('question', 'choice', 'position', 'is_correct')
    search_fields = ('choice',)
    list_filter = ('question', 'is_correct')
```
⭐ Exhibition_Entry Model:

- Contains fields for country, state, title, edition, username, slug, model link, media files, description, team members, school name, and verification status.
- `front_view_preview` property generates an HTML image tag for the front view.
- `save` method auto-generates a slug and model link before saving.
⭐ Question Model:

- Contains fields for the question text, an optional image, and an optional description.
⭐ Choice Model:
- Contains fields for the related question, choice text, position, and correctness.
- Enforces unique constraints on choice text and position per question.
- Orders choices by position.
```
class Exhibition_Entry(models.Model):
    # ... existing fields ...
    @property
    def front_view_preview(self):
        if self.exhibition_front_view:
            return mark_safe('<img src="{}" width="192" height="108" />'.format(self.exhibition_front_view.url))
        return ""

    def save(self, *args, **kwargs):
        slug_link = self.title + " " + str(uuid.uuid4())
        self.slug = slugify(slug_link)
        self.model_link = "/model/" + self.slug
        super(Exhibition_Entry, self).save(*args, **kwargs)

class Question(models.Model):
    question = models.CharField(max_length=200)
    image = models.ImageField(upload_to='artifacts/', blank=True)
    description = models.TextField(blank=True)

class Choice(models.Model):
    question = models.ForeignKey("Question", related_name="choices", on_delete=models.CASCADE)
    choice = models.CharField("Choice", max_length=50)
    position = models.IntegerField("position")
    is_correct = models.BooleanField(default=False)
    class Meta:
        unique_together = [("question", "choice"), ("question", "position")]
        ordering = ("position",)
```













		
