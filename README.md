# Personal Food Recipe Manager

The aim of this project is to develop a web application that allows users to create, view, edit, and
delete personal food recipes, and categorize them based on cuisine type. Users can manage
detailed recipe information, filter recipes by category, and store all data securely with authentication features. The system will feature JWT , with data stored
in MongoDB.

## **Key Features**

**User Authentication**

Users can register or log in using email/password with JWT authentication or quickly
access their account via Google OAuth.

**Recipe Management (CRUD)**

Users can create, view, edit, and delete recipes, and categorize them by cuisine type.

**REST API Design**

The API includes endpoints for user authentication and recipe CRUD operations with
cuisine categorization.

**Database**

The users collection stores user details, and the recipes collection stores recipe data
with cuisine type and user ID references.

**Frontend (React)**

The app includes authentication pages, a recipe dashboard with cuisine filters, and
forms for adding or editing recipes.

**Security Measures**

Passwords are hashed with bcrypt, JWTs are stored in HTTP-only cookies, and API
routes are protected with middleware.

## **Tech Stack**

**Frontend**: React, React Router

**HTTP Requests**: Axios

**Backend**: Node.js/Express (assumed for API endpoints /auth/login, /auth/signup, /books)

**State Management**: React useState & useEffect


## **INSTALLATION**

``` cmd
#frontend folder
cd frontend

#Install dependencies
npm install

#Start development server
npm run dev


#backend folder
cd backend

#Install dependencies
npm install

#Start development server
npm run dev



