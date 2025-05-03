# Ai-Title-Deed-verificator

A web application that allows users to upload images of the Title,sale deed . The application reads the images, identifies the language and extarct the text frrom it with the help of tessdatalanguage models.After this the application convert it to english and extract all the necessary details and will cross-check the details with the databases.

---

## Features

- **Upload Images**: Upload any image file to verify it.
- **Modern UI**: Built with **React-Bootstrap** for responsive and stylish components.
- Used Gemini LLM Api to convert and extract needed details.
- Used tesseract OCR to convert image to text.

---

## Tech Stack

### Frontend
- **React.js**
- **React-Bootstrap**
- **TailwindCSS**

### Backend
- **Django**
- **PostgreSQL**
- **REST API**
- **Gemini LLM APi**
- **Tesseract OCR**

## How to run on Locally
- step 1- Import All the Files to your local Storage
- step 2- Install latest Versions of django,React.js and postgreSQL.
- step 3- Replace the Gemini LLM key,postgres username, password with the yours.
- step 4- Create 'imageinsight' database locally on postgresSQL.
- step 5- Install all the needed dependencies included in the backend/requirements.txt files.
- step 6- Run Front-end in react(vite). cd /frontend/npm run dev.
- step 7- Run Back-end in Django. cd /backend/python manage.py runserver.
- step 8- Dont forget to host bothe servers.
- step 9- uplaod your image  and click on Upload.
- step 10- Copy text and paste to notepad or word to get the formatted way.
 
# Preview images with landing page, mainpage and result.
![Image](https://github.com/user-attachments/assets/07003ec3-13d4-435f-a654-0a3ccc503387)
![Image](https://github.com/user-attachments/assets/c7e0a088-29d0-4d9d-9eb5-69c390197ded)
![Image](https://github.com/user-attachments/assets/3bfa8886-6e73-4d98-be53-52c448afed0d)
 
