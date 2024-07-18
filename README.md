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






		
