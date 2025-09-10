<<<<<<< HEAD
# Mental Health Care System - SIH Hackathon Project

## Overview
The Mental Health Care System is a comprehensive platform designed to support individuals in managing their mental well-being. Built using React with Vite for the client-side and Node.js with Express for the server-side, this application provides features for mood tracking, journaling, community support, and mental health resources.

## Project Structure
The project is organized into two main directories: `client` and `server`.

### Client
- **`client/src`**: Contains the source code for the React application.
  - **`components`**: Reusable React components.
  - **`pages`**: Main page components defining the structure of different pages.
  - **`assets/styles`**: CSS styles for the client application.
  - **`App.jsx`**: Main application component that sets up routing and layout.
  - **`main.jsx`**: Entry point for the React application.
- **`client/index.html`**: Main HTML file serving the React application.
- **`client/package.json`**: Configuration file for npm in the client directory.
- **`client/vite.config.js`**: Configuration settings for Vite.

### Server
- **`server/src`**: Contains the source code for the Node.js application.
  - **`controllers`**: Controller functions handling requests and responses.
  - **`routes`**: Sets up routes linking to controller functions.
  - **`models`**: Data models for database interactions.
  - **`middleware`**: Middleware functions for request handling.
  - **`config`**: Configuration settings for the server.
  - **`app.js`**: Entry point for the server application.
- **`server/package.json`**: Configuration file for npm in the server directory.
- **`server/.env`**: Environment variables for the server application.

## Features

- **User Authentication**: Secure registration and login system with JWT
- **Personalized Dashboard**: Interactive dashboard with mood tracking and inspirational content
- **Mood Tracking**: Track and visualize your mood patterns over time
- **Journaling**: Private space to record thoughts and feelings
- **Resources**: Access to mental health resources and information
- **Community Support**: Connect with others in a supportive environment
- **Responsive Design**: Beautiful user interface that works on all devices

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sih-hackathon
   ```

2. Set up the server:
   ```
   cd server
   npm install
   ```

3. Configure the MongoDB connection by editing the `.env` file:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/mental-health-care
   ```

4. Start the server:
   ```
   npm run dev
   ```

5. In a new terminal, set up the client:
   ```
   cd ../client
   npm install
   ```

6. Start the client:
   ```
   npm run dev
   ```

7. Open your browser and navigate to http://localhost:5173

4. Set up environment variables in the `.env` file in the server directory.

5. Start the client application:
   ```
   cd ../client
   npm run dev
   ```

6. Start the server application:
   ```
   cd ../server
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
=======
# Mental_Health_Care
>>>>>>> b96a2f27f045bb51ba3e32102d9de347eeff8162
