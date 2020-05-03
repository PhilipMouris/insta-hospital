# InstaHospital

The app connects patients to the nearest eligible hospitals.
Hospitals are eligible if they serve the patient’s needs and have free rooms to immediately accommodate the patient.
Each user will have a medical ID, that stores all important medical information, so that the hospital can make all necessary arrangements upon receiving the patient’s request.

# Local Installations

- Install NodeJs (npm automatically installed with it) https://nodejs.org/en/
- Install PostgreSQL https://www.postgresql.org/
- Clone the repo
- Set the required environment variables (see below)
- cd>server>npm install > npm start
- cd>client>npm install > node index.js

# Docker

- There are 2 Docker files, one for the server and one for the client
- To start the server separately run docker run -it -p 3000:3000 philip/api
- To start the client separately run docker run -it -p 3001:3001 philip/web

# Docker Compose

- To start the entire project run docker-compose up --build
- This will create 3 Images:
- 1- PostgreSQL image
- 2- Server image
- 3- Client image

# Client Dependencies

- Axios to issue HTTP Requets
- Dotenv to use env files
- Firebase to receive notifications
- React UI framework
- React-date-pick A date picker
- React-dom Virtual DOM for react
- React-google-maps A react wrapper for google maps library
- React-Redux A state management tool for React
- React-Router SPA Routing
- React-Router-Dom
- React-Scripts to start the app
- Redux A state management tool
- Semantic-ui-css Predefined styles and classes
- Semantic-ui-react UI Library for React

# Server Dependencies

- @molteni/coordinate-utils to randomly generate coordinates withing a given range
- Axios to issue HTTP requests
- BcryptsJs to encrypt/decrypt passwords
- Cors Cross-Origin Resource Sharing
- Express-async-wrapper A wrapper to handle all errors using a middleware
- Firebase-admin To send notifications
- Joi A request validation library
- JsonWebToken Parse/Decode tokens
- Moment a date format library
- Morgan To log requests
- Nodemailer Sending emails
- Passport Authorization library
- pg DB driver for PostgreSQL
- Sequelize ORM
- wrap Route Wrapper

# Configurations

- There are the 3 Config files (Examples are provided)
- client .env file (Example -> env.default), The PORT number and required API Credentials for Google maps and Firebase
- server .env file (Example -> env.default) The required API credentials for the DB,JSON Token,Send Grid,Firebase,Google maps
- server config -> adminKey.json (Example -> adminKey.example.json) The required API credentials for Firebase admin

# Client .env

- REACT_APP_MAP_API_KEY -> Google Maps Key obtained from google firebase console
- REACT_APP_FIREBASE_KEY -> Google Firebase key obtained from google firebase console
- REACT_APP_AUTH_DOMAIN -> Google Firebase auth domain obtained from google firebase console
- REACT_APP_PROJECT_ID -> Google Firebase project ID obtained from google firebase console
- REACT_APP_DATABASE -> Google Firebase database obtained from google firebase console
- REACT_APP_STORAGE_BUCKET -> Google Firebase storage bucket obtained from google firebase console
- REACT_APP_SENDER_ID -> Google Firebase sender ID obtained from google firebase console
- REACT_APP_FIREBASE_APP_ID -> Google Firebase App ID obtained from google firebase console
- PORT -> Port number the app will run on

# Server .env

- DB_NAME -> Name of postgreSQL Database
- DB_PASSWORD -> Database password
- DB_USER_NAME -> Database username
- TOKEN_KEY -> Json Token key (used to decode tokens in incoming requests)
- SEND_GRID_SERVICE -> Transporter Service name
- SEND_GRID_USER -> Send Grid user name
- SEND_GRID_PASSWORD -> SendGrid password
- FIREBASE_URL -> Google firebase URL
- FIREBASE_SENDER_ID -> Google Firebase sender ID obtained from google firebase console
- FIREBASE_AUTHORIZATION_KEY -> Google Firebase key obtained from google firebase console
- GOOGLE_MAPS_API_KEY -> Google Maps Key obtained from google firebase console

  # Authors

  - Philip Mouris
  - Youssef Sherif
  - Youssef Fathi

  # License

  - ISC
