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

👉 Login Page

👉 Register Page

👉 Common Lobby

👉 Dynamic Lobby

👉 State-wise Lobby

👉 Edition-wise Lobby

👉 Interactive Quiz

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













		
