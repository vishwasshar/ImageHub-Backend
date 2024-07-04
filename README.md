# ImageHub Backend

## Description

**ImageHub Backend** is the server-side component of the ImageHub application, developed using **Node.js** and **Express.js**. This repository handles user authentication, image storage, and API endpoints for the front-end application. It employs **Bcrypt** for secure password hashing, **JWT** for token-based authentication, and **Cloudinary** for image management. This project also helped me understand the process of hosting Node.js APIs on **Vercel**.

### Key Features

- **User Authentication**: Secure login and signup using JWT.
- **Image Storage**: Upload and manage images with Cloudinary integration.
- **API Endpoints**: Provides RESTful APIs for frontend communication.
- **Password Security**: Utilizes Bcrypt for hashing passwords.
- **Modular Architecture**: Clean and maintainable code structure.
- **Vercel Hosting**: Deployed on Vercel for seamless API hosting.

### Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web application framework for building REST APIs.
- **Bcrypt**: Password hashing library for secure storage.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Cloudinary**: Cloud service for image storage and management.
- **MongoDB**: NoSQL database for storing user and image data.
- **Mongoose**: ODM for MongoDB, providing schema-based data modeling.
- **Vercel**: Hosting platform for Node.js applications.

## Frontend Repository

The backend serves the [ImageHub Frontend](https://github.com/vishwasshar/ImageHub), a React-based application for managing and displaying images.

## Live API

Access the live API hosted on Vercel: [https://image-hub-backend-xi.vercel.app/](https://image-hub-backend-xi.vercel.app/)

## Setup and Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/vishwasshar/ImageHub-Backend.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd ImageHub-Backend
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

5. **Run the development server**:

    ```bash
    npm start
    ```

The server will run at `http://localhost:5000`.

## API Endpoints

### Image Routes (`/img`)

- **`POST /img/submit`**: Submit a new image.
    - Middleware: `isAuth`
    - Controller: `imgSubmission`
  
- **`PUT /img/updateView/:id`**: Update view count for an image.
    - Middleware: `isAuth`
    - Controller: `updateImgView`

- **`POST /img`**: Search for images.
    - Middleware: `isAuth`
    - Controller: `searchImg`

### User Routes (`/user`)

- **`PUT /user/create`**: Create a new user.
    - Controller: `createUser`

- **`POST /user/login`**: Log in a user.
    - Controller: `loginUser`

## File Structure

```plaintext
.
├── controller
│   ├── Img.js
│   └── user.js
├── middleware
│   └── isAuth.js
├── routes
│   ├── Img.js
│   └── user.js
├── util
│   └── database.js
├── .env
├── app.js
└── package.json
```

## Contact Information

For any questions, feedback, or contributions, feel free to reach out to me via:

- **Email**: [vishwassharma3287@gmail.com](mailto:vishwassharma3287@gmail.com)
- **LinkedIn**: [Vishwas Sharma](https://www.linkedin.com/in/vishwassharma3287/)

I welcome your input and look forward to connecting with you!


