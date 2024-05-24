| [🇺🇸 English](README-en.md) |
| [🇧🇷 Português](https://github.com/worklarissa/Banco-De-Ideias) |

# Ideas Bank 💡​🗃️​
![Captura de tela de 2024-05-21 14-54-08](https://github.com/worklarissa/Banco-De-Ideias/assets/139612792/ee5e94c4-5236-4106-a7a4-693a5233710c)
### A project made to inspire and catalyze creativity among developers 💡🎨
![stats-last commit](https://img.shields.io/github/last-commit/worklarissa/Banco-De-Ideias?display_timestamp=committer&labelColor=%23FFD602&color=white)
![stats-count-languages](https://img.shields.io/github/languages/count/worklarissa/Banco-De-Ideias?labelColor=%23FFD602&color=white)
![repository-size](https://img.shields.io/github/repo-size/worklarissa/Banco-De-Ideias?labelColor=%23FFD602&color=white)
![stars-count](https://img.shields.io/github/stars/worklarissa/Banco-De-Ideias?style=social&logoColor=%23FFD602&labelColor=%23FFD602&color=%23FFD602)

---
## 📖Sections
- [Technologies used in the project](#technologies-used-)
- [Features](#project-features-)
- [Project overview](#project-overview-)
- [How to run this project?](#running-the-project-%EF%B8%8F)
     - [Local environment setup](#%EF%B8%8Flocal-environment-setup)
     - [Accessing locally](#accessing-the-project-locally-)
- [Backend project](#api-used-for-the-project-)
- [Project status](#final-considerations-)
---












## Project Features 📱
- [X] User registration
- [x] Login
- [x] Create project
- [x] Edit project created by user 
- [x] View  projects ideas created by other users
- [x] View user profile
- [x] View projects ideas created by the user that are pending
- [x] View projects ideas created by the user that are approved
- Future features:
  - [ ] Search bar to search for project ideas by title
  - [ ] Filter projects by technologies
  - [ ] Delete project idea
  - [ ] Visual menu for admin to manage and approve ideas
  - [ ] Profile picture option for the user

--- 

## Technologies Used 👾​
![react](https://img.shields.io/badge/react-%23ECD53F?style=for-the-badge&logo=react&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![vite](https://img.shields.io/badge/vite-%23ECD53F?style=for-the-badge&logo=vite&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![dotenv](https://img.shields.io/badge/.dotenv-%23ECD53F?style=for-the-badge&logo=dotenv&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react router dom](https://img.shields.io/badge/react%20router%20dom-black?style=for-the-badge&logo=reactrouter&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react auth kit](https://tinyurl.com/4uef466r)
![yup](https://img.shields.io/badge/Yup-white?style=for-the-badge&logo=reacthookform&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react boostrap](https://tinyurl.com/3napvcn4)
![react-contenteditable](https://tinyurl.com/5787f4rs)
![react-toastfy](https://tinyurl.com/wtyhuv47)
![axios](https://img.shields.io/badge/axios-white?style=for-the-badge&logo=axios&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)

---
## Project Overview 💡

Often, both beginner and experienced developers struggle to develop projects. The Ideas Bank is here to solve this problem! In this project, developers can view project ideas published by other developers!

The project currently allows developers to view and publish ideas that will be evaluated by our team to decide if they can be included on the site.

A valid post contains technology recommendations, a difficulty level appropriate to the project size, and a valid description.

Just sign up (don't use a password you plan to use for real).

To access the Ideas Bank: work in progress (deployment made with Vercel)

The project includes an authentication system based on JSON Web Token. To handle authentication, our team used the react-auth-kit library, which allows easy manipulation of cookies and protected routes. The project also uses the react-router-dom library, which allows route separation by protected routes and some other functionalities.

---
# Running the project 💻▶️
## ⚙️Local Environment Setup
Create a .env file in the folder where your project's package.json is located and configure the necessary environment variables:

Example .env file:

VITE_API_URL = http://exampleurl

---

## Accessing the Project Locally 🏠​


First, clone the repository to the directory you want to save it in using the command in the terminal:

git clone "repository link without quotes"

Then, in the project's root folder, install the dependencies using the command:

npm i

Finally, to access the project, just use the command:

This command will generate a link to the local server that can be copied and pasted into the browser to access it.

npm run dev


---

## API Used For The Project 🔙​
This API handles site functionalities such as login and logout and post management https://github.com/Andernial/Banco-De-Ideias-API
---

## Final Considerations 📦

The project is under development and will be updated to receive new features such as filtering ideas by difficulty, adding images to ideas, and post evaluation.

Responsiveness is still being worked on for some mobile devices.


---

## Results ##
work in progress
