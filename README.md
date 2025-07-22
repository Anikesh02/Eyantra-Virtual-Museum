e-Yantra 2024


# 3D Metaverse Virtual Museum Competition

Anikesh Kulal

Akshit Garg

Mentor Name - Premkumar S, Deepa Avudiappan

Duration of Internship: 27/06/2024 − 19/07/2024

## 📋 <a name="table">Table of Contents</a>

1. 👨‍💻 [Setup](#setup)
2. ⭐ [Abstract](#abstract)
3. ✅ [Completition Status](#complete)
4. ⚙️ [Tech Stack](#tech-stack)
5. 🤸 [Admin Side](#admin-side)
6. 📃 [Pages](#pages)


## <a name="setup" style="text-decoration: none;">Setup</a>

Fetching git code to local system:

- Clone the repository from GitHub:
    ```
    git clone https://github.com/eYSIP-2024/24_metaverse_museum.git
    ```
- Setup a virtual environment
  ```
  python -m venv env
  ```
Install dependencies:

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
- In another terminal, run the django server (Don't cd location in this terminal):


    ```
    python manage.py runserver
    ```
  	
  	
- Add uploads folder:

    The uploads file structure should be like this:
  
	[![uploads-Img.png](https://i.postimg.cc/SxsM1tg9/uploads-Img.png)](https://postimg.cc/JGf0GKV7)

## <a name="abstract">Abstract</a>
 
The e-Yantra Virtual Museum is an engaging online platform showcasing India's rich cultural heritage. It features interactive maps, detailed exhibits, a dynamic lobby, and edition-wise and state-wise artifacts for an immersive experience. Users can explore artifacts, learn regional traditions, and visit 3D models built by students. The platform includes user authentication and quizzes to enhance interaction and engagement, leveraging modern web technologies to make cultural education accessible and enjoyable globally.

## <a name="complete">Completition Status</a>
Features successfully implemented are: 

- Created an interactive India map: Clicking a state takes user to a virtual museum specific to that region.
- Dynamic Lobby: Adding new artifacts to database automatically populates them in the museum lobby.
- Info Desk through which user can get the info of any artifact.
- Users can select any artifact from the set of images in musuem and position themselves directly in front of it for a closer look.
- Edition-wise Artifacts: Users can visit edition-wise lobby
- State-wise Artifacts: After selecting any state from India map, user will be able to see artifacts with respect to particular state in the lobby.

- Interactive Quiz: Amazing and fun quizzes to enhance user interactions and engagement.

## <a name="tech-stack">Tech Stack</a>

- Three.js : "0.165.0"
- Node.js : "20.12.2"
- npm : "10.5.0"
- python : "3.10.4"
- Django : "3.2"
- MySQL
- HTML
- CSS

## <a name="admin-side">Admin Side</a>
 - Add/Edit/Delete Artifacts: Interface to manage artifact details such as name, description, images, and associated multimedia.
 - Artifact Categorization:  Categorize artifacts by country, state, and edition for easier navigation and management.
 - Adding Quiz Questions and Answers with images.
 - Authentication : Role based authentication for user and admin

## <a name="pages">Pages</a>

 🔷 [Landing Page](#landing)
   
 🔶 [India Map](#indiaMap)

 🔷 [Register & Login Page](#register-login)

 🔶[Common Lobby](#commonLobby)

 🔷 [Dynamic Lobby](#dynamicLobby)

 🔶 [State-wise Lobby](#stateLobby)

 🔷 [Ediition-wise Lobby](#editionLobby)
 
 🔶 [Interactive Quiz](#quiz)
 
 🔷 [Model Page](#modelPage)

 🔶 [Admin Page](#admin-page)

### <a name="landing">Landing Page</a>

⭐ Header Section

   The header section includes the navigation bar and logo. It also contains links for different sections of the website and user authentication options.
  

⭐ Home Section

The home section introduces the virtual museum with a title, subtitle, and a call-to-action button. It also includes a background video.


⭐ Feature Section

This section highlights the key features of the virtual museum, such as the virtual museum, locations, and artifact gallery.

⭐ Footer Section

In the footer section, quick links and information about the website are typically displayed to help users navigate and learn more about the platform.

### <a name="indiaMap">India Map</a>

Route: `/india`

⭐ Loading India Map

To load the 3D model of the India map, we use the GLTFLoader from the three.js library. The model is scaled and positioned appropriately, and each state is assigned a texture.


⭐ Highlighting States on Mouse Hover

We use a Raycaster to detect mouse movements over the states. When a state is hovered over, its color changes, and the corresponding language is displayed.


⭐ Displaying Info Desk on State Click

When a state is clicked, an info desk appears showing artifacts related to that state. This is achieved by adding a click event listener to the renderer's DOM element.


⭐ Display State Info

The function updates the info desk with the selected state's information, including its name, capital, image, and artifacts. It then makes the info desk visible.


⭐ Timeline Click Event

A click event listener to each state in the timeline. When a state is clicked, it calls the displayStateInfo function to update the info desk with the selected state's information.


⭐ Go Back Button

It adds a click event listener to the `Go Back` button. When the button is clicked, it hides the info desk by adding the `hidden` class.


⭐ Go to Museum Button

It adds a click event listener to the `Go to Museum` button. When the button is clicked, it redirects the user to the particular museum page.



### <a name="register-login">Register & Login Page</a>

The Login and Register template provides a unified interface for both login and registration forms. Depending on the context variable page, it dynamically displays either the login or registration form. The login form includes fields for username and password, while the registration form utilizes Django's form rendering. Both forms are styled with a consistent CSS to ensure a cohesive user experience. Links are provided to switch between the login and registration pages, enhancing user navigation.

⭐ Register

Route: `/register`

The Register section includes a registration form where users can input their username and password to create a new account. It also provides a link to the login page for users who are already registered.

⭐ Login

Route: `/login`

The Login section includes a login form where users can enter their credentials to access their account. It also includes a link to the registration page for new users to sign up.

### <a name="commonLobby">Common Lobby</a>

Route: `/commonLobby`

⭐ Functions:

➡️ `createFloor()`:
The createFloor function generates a floor plane in the 3D scene using a specified texture. It sets up the geometry, loads the texture, and applies it to the material. The floor is then positioned and added to the scene.

➡️ `loadModel()`: 
The loadModel function loads a 3D model in GLTF format into the scene. It uses the GLTFLoader and DRACOLoader to decode and load the model, then positions, scales, and rotates it before adding it to the scene.

➡️ `Q_Key()`: 
The Q_key function sets up an event listener for the 'Q' key to open a floor selection modal. It defines functions to open and close the modal and to set the camera height based on the selected floor.

➡️ `createImagePlaneWithBorder`: 
The createImagePlaneWithBorder function creates an image plane with an optional border. It loads the image texture, creates the plane geometry and material, and positions the plane in the scene. If a border is specified, it creates and positions the border around the image plane.

➡️ `isCameraFacingPlane()`: 
The isCameraFacingPlane function checks if the camera is facing a given plane. It calculates the normal vector of the plane and the direction vector of the camera, then checks the dot product to determine if the camera is facing the plane.

➡️ `checkCameraPosition()`:
The checkCameraPosition function checks the camera's position relative to the planes in the scene. If the camera is close to and facing a plane, it displays a modal with information about the plane. The modal includes an image, title, description, and links.

➡️ `P key functionality`:
In commonlobby.js, pressing the 'P' key triggers the showSelectionModal function, which creates and displays a modal window. This modal contains a selection of images representing different planes in the 3D scene. Each image is clickable and navigates the camera to the corresponding plane. The modal can be closed by clicking the "Close" button. This functionality allows users to quickly navigate to different parts of the scene by selecting from a visual menu.

### <a name="dynamicLobby">Dynamic Lobby</a>

⭐ Core Functionalities :

  - Creating Image Planes with Borders
  -  Navigating to Specific Image Planes
  -  Checking Camera Position and Displaying Modals
  -  Loading 3D Models of Stands
  - Creating and Managing Spotlights
  -  Creating Walls and Floors
  - Stairs Logic

 Functions: 
 
➡️ `createImagePlaneWithBorder`: 
The createImagePlaneWithBorder function creates an image plane with an optional border. It loads the image texture, creates the plane geometry and material, and positions the plane in the scene. If a border is specified, it creates and positions the border around the image plane.

➡️ `navigateToImage()`:
The navigateToImage function in commonlobby.js allows the camera to navigate to a specific image plane in the 3D scene. It calculates the new camera position based on the target plane's position and rotation, and then updates the camera's position and orientation to focus on the target plane. This function is typically called when an image in the selection modal is clicked, providing a smooth transition to the selected plane.

➡️ `createStairs()`:
Tthe createStairs function is used to create stair structures in the 3D scene. It defines the geometry, texture, and position for each stair plane and adds them to the scene. The updateCameraPosition function simulates the camera's movement when climbing or descending the stairs. It checks the camera's position relative to the defined stair boundaries and adjusts the camera's height accordingly to simulate the stair climbing and descending effect. 

### <a name="stateLobby">State-wise Lobby</a>

Route: `/indiaLobby/IN-MH`  (If state is Maharashtra)

⭐ Core Functionalities:

➡️ `indiaLobby()` :

To display filtered exhibition entries in the indiaMuseum.html template, the process involves fetching all Exhibition_Entry objects from the database, then filtering these entries by state_code to match the desired criteria. After filtering, construct a list of dictionaries, where each dictionary contains relevant details about an exhibit, such as its name, description, and image URL. This list is then converted to JSON format. Finally, pass this JSON data to the indiaMuseum.html template, ensuring that the frontend can dynamically render the filtered exhibition entries based on the provided state_code. This approach allows for a flexible and dynamic display of exhibition content tailored to user preferences or specific criteria.

 ➡️ The `frames` array defines the configuration for various frames displayed in the virtual museum. Each frame object includes properties for position, rotation, width, height, border position offset, and whether it has a border. These properties ensure that each frame is accurately placed and oriented within the 3D space of the museum. The frames are distributed across different floors and walls, creating a structured and visually appealing layout for the exhibits.


➡️ The code iterates over the data array and creates image planes with borders using the createImagePlaneWithBorder function. Each plane is configured with properties from the corresponding data and frames arrays, such as position, rotation, dimensions, and additional metadata (like slug, modalInfo, reportUrl, youtubeUrl, and title). The created planes are then pushed into the planes array. The array is created in a way as new artifacts will be added in the lobby in future, they will be placed based on the positions stored in the array.
```
for (let i = 0; i < data.length; i++) {
    planes.push(createImagePlaneWithBorder(data[i].imageUrl, frames[i].position, frames[i].rotation, frames[i].width, frames[i].height, frames[i].borderPositionOffset, frames[i].hasBorder, data[i].slug, data[i].modalInfo, data[i].reportUrl, data[i].youtubeUrl, data[i].title));
}
```

### <a name="editionLobby">Edition-wise Lobby</a>

Route: `/edition/[editionNo]/` (Example: /edition/1/)


⭐ Core Functionalities: 

➡️ `edition()`:

This function handles the logic for displaying exhibition entries filtered by a specific edition. It fetches all entries, filters them by the provided edition 1,2,3,4 and so on and then serializes the data to JSON format to be rendered in the template.

 ➡️ The `frames` array defines the configuration for various frames displayed in the virtual museum. Each frame object includes properties for position, rotation, width, height, border position offset, and whether it has a border. These properties ensure that each frame is accurately placed and oriented within the 3D space of the museum. The frames are distributed across different floors and walls, creating a structured and visually appealing layout for the exhibits.

 ➡️ The code iterates over the data array and creates image planes with borders using the createImagePlaneWithBorder function. Each plane is configured with properties from the corresponding data and frames arrays, such as position, rotation, dimensions, and additional metadata (like slug, modalInfo, reportUrl, youtubeUrl, and title). The created planes are then pushed into the planes array. The array is created in a way as new artifacts will be added in the lobby in future, they will be placed based on the positions stored in the array.
```
for (let i = 0; i < data.length; i++) {
    planes.push(createImagePlaneWithBorder(data[i].imageUrl, frames[i].position, frames[i].rotation, frames[i].width, frames[i].height, frames[i].borderPositionOffset, frames[i].hasBorder, data[i].slug, data[i].modalInfo, data[i].reportUrl, data[i].youtubeUrl, data[i].title));
}
```

### <a name="quiz">Interactive Quiz</a>

Route: `/quiz`

⭐ Functions: 

➡️ `handleQuestions()`: This function ensures that a random set of questions is selected for each quiz session, preventing repetition and ensuring variety.

➡️ `NextQuestion()`: This function updates the HTML elements to show the current question and its options, ensuring the user sees the correct content.

➡️ `checkForAnswer()`: This function verifies the user's selected answer, updates the background color of the options to indicate correctness, and displays the explanation for the correct answer.


### <a name="modelPage">Model Page</a>

Route: `/modelPage/id`

➡️ `Video Element:` The video element is used to display a background video that plays as the user scrolls. The src attribute dynamically loads the video file associated with the exhibit.

➡️ `JavaScript for Loader and Video Scroll:` The script hides the loader after 5 seconds and synchronizes the video playback with the user's scroll position. The scrollPlay function updates the video's current time based on the scroll position, creating a seamless scrolling animation effect.


### <a name="admin-page">Admin Page</a>

Route: `/admin`

⭐ Exhibition_Entry Admin:

- `list_display`: Shows specific fields in the list view.
- `search_fields`: Enables search functionality on specified fields.
- `list_filter`: Adds filter options in the admin sidebar.
- `readonly_fields`: Makes certain fields read-only.
- `fieldsets`: Organizes fields into sections for better UI.
  
⭐ Question Admin:

- `list_display`: Displays the question text in the list view.
- `search_fields`: Allows searching by question text.
- `list_filter`: Adds filtering options for questions.
  
⭐ Choice Admin:

- `list_display`: Shows question, choice text, position, and correctness in the list view.
- `search_fields`: Enables search by choice text.
- `list_filter`: Adds filtering options for questions and correctness.

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












>>>>>>> ac58f949a5bb39755af3219223839312df84dea7
		
