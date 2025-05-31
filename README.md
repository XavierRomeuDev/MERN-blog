
# 📝 MERN Blog

A simple blog application built using the MERN stack (MongoDB, Express, React, Node.js). This project serves as an introduction to full-stack development with modern JavaScript technologies.

## 📁 Project Structure

- `api-rest-node/`: Backend API built with Node.js and Express.
- `blog-frontend/`: Frontend application developed with React.
- `README.md`: Project documentation.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [MongoDB](https://www.mongodb.com/) (or use a cloud service like MongoDB Atlas)

### Installation

1. Clone this repository:

   git clone https://github.com/XavierRomeuDev/MERN-blog.git

2. Navigate into the project directory:

   cd MERN-blog

3. Set up the backend:

   cd api-rest-node
   npm install

4. Set up the frontend:

   cd ../blog-frontend
   npm install

5. Configure environment variables:

   - For the backend, create a `.env` file in the `api-rest-node` directory with the following content:

     MONGO_URI=your_mongodb_connection_string
     PORT=5000

   - For the frontend, create a `.env` file in the `blog-frontend` directory with the following content:

     REACT_APP_API_URL=http://localhost:5000/api

6. Run the backend server:

   cd ../api-rest-node
   npm start

7. Run the frontend development server:

   cd ../blog-frontend
   npm start

8. Open your browser and navigate to:

   http://localhost:3000

## 🛠️ Features

- User authentication and authorization.
- CRUD operations for blog posts.
- Responsive user interface built with React.
- RESTful API built with Express and MongoDB.

## 🤝 Contributing

Contributions are welcome! If you want to add features, fix bugs, or improve the project, please open an **issue** or submit a **pull request**.

## 📄 License

This project is licensed under the **MIT** license. See the `LICENSE` file for more information.
