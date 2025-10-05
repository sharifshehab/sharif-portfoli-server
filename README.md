# Sharif .S 

Robust Backend with Modern Tools: Built with Node.js, Express, and TypeScript, using Mongoose for MongoDB data modeling and Cloudinary for media storage. Follows a modular architecture, implements JWT authentication, and uses bcrypt for secure password hashing.


## Tech Stack:
- **Node**
- **Express**
- **TypeScript**
- **Mongoose**
- **MongoDB**
- **Cloudinary**


## Key features:
1. **Modular Architecture: Organized code structure following the modular pattern for maintainability.**
2. **File & Media Handling: Cloudinary integration for image uploads and media management.**
3. **Error Handling & Validation: Centralized error handling with input validation to ensure API reliability.**



## Installation:
1. **First, download the repository to your local machine.**
2. **If cloning using the web URL, then delete the <code>.git</code> folder. By default, it's hidden**
3. **Create a file name <code>.env</code>, inside the project root folder**
4. **Save your environment variables in this file:**
    - **PORT=port-number**
    - **DB_URL=mongodb-uri**
    - **NODE_ENV=development or production**

    - **JWT_ACCESS_SECRET=access_token_secret**
    - **JWT_ACCESS_EXPIRES=access_token_expire_time**
    - **JWT_REFRESH_SECRET=refresh_token_secret**
    - **JWT_REFRESH_EXPIRES=refresh_token_expire_time**

    - **EXPRESS_SESSION_SECRET=session_secret**

    - **BCRYPT_SALT_ROUND=salt_round_number**

    - **CLOUDINARY_CLOUD_NAME=cloud_name**
    - **CLOUDINARY_API_KEY=cloud_key**
    - **CLOUDINARY_API_SECRET=cloud_secret**

    - **SUPER_ADMIN_EMAIL=admin_email**
    - **SUPER_ADMIN_PASSWORD=admin_password**

    - **FRONTEND_URL=frontend_url**

5. **Open the project folder with cmd terminal**
6. **Write <code>npm i</code> in the terminal. This will install all the necessary packages with their latest versions on your system**
7. **After the installation is complete, start the application by typing <code>npm run dev</code> in terminal**

- **You should now be able to interact with the application on your local machine!**


##  Live Link:
- **[Sharif.S server](https://sharif-portfoli-server.vercel.app)**

