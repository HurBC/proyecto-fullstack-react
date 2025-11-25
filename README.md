# Level Up Game Store - Full Stack Application

This repository contains the complete source code for the Level Up Game Store, a full-stack web application built with a React frontend and a Spring Boot backend.

## Table of Contents

- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Key Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Game Catalog:** Browse and filter a comprehensive catalog of games.
- **Product Details:** View detailed information for each game.
- **Shopping Cart:** Add, remove, and update quantities of games in a persistent shopping cart.
- **Role-Based Access:** (Backend) Different permissions for `ADMINISTRADOR`, `VENDEDOR`, and `CLIENTE` roles.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server for modern web projects.
- **React Router:** For declarative routing in the React application.
- **Styled-Components:** For component-level styling.
- **Axios:** A promise-based HTTP client for making API requests.
- **Vitest:** A blazing fast unit test framework powered by Vite.
- **React Testing Library:** For testing React components.

### Backend

- **Java 21 & Spring Boot 3.2:** For building the robust RESTful API.
- **Spring Security:** For authentication and authorization.
- **JSON Web Tokens (JWT):** For securing API endpoints.
- **Spring Data JPA:** For database interaction.
- **H2 Database:** An in-memory database for development.
- **Maven:** For dependency management.
- **Swagger UI:** For API documentation.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js:** v18.x or later
- **npm:** v8.x or later
- **Java Development Kit (JDK):** v21 or later
- **Apache Maven:** v3.8 or later

## Getting Started

Follow these steps to set up and run the project locally.

### Backend Setup

1.  **Clone the API Repository:**

    ```bash
    git clone https://github.com/example/levelup-api.git
    cd levelup-api
    ```

2.  **Build the Project:**

    ```bash
    mvn clean install
    ```

3.  **Run the Backend Application:**

    ```bash
    mvn spring-boot:run
    ```

    The backend server will start on `http://localhost:8080`.

### Frontend Setup

1.  **Clone this Frontend Repository:**

    ```bash
    git clone https://github.com/example/levelup-frontend.git
    cd levelup-frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

## Running the Application

1.  **Start the Backend Server:**
    - Navigate to the backend project directory (`levelup-api`) and run:
      ```bash
      mvn spring-boot:run
      ```

2.  **Start the Frontend Development Server:**
    - In a separate terminal, navigate to this frontend project directory (`levelup-frontend`) and run:
      ```bash
      npm run dev
      ```

    The frontend application will be available at `http://localhost:5173`.

## Project Structure

### Frontend

The frontend source code is located in the `src/` directory, organized as follows:

```
src/
├── modules/        # Feature-based modules (e.g., home, login, products)
├── shared/         # Shared components, providers, services, and UI elements
│   ├── components/ # Reusable UI components (e.g., Button, Card)
│   ├── providers/  # Global state management (AuthProvider, CartProvider)
│   ├── services/   # API communication layer (auth.js, games.js, api.js)
│   └── ui/         # Base UI components (e.g., Text, Row, Column)
├── App.jsx         # Main application component with routing logic
└── main.jsx        # Entry point of the React application
```

### Backend

The backend follows a standard Spring Boot project structure. Key directories include:

-   `src/main/java`: Contains the main application source code, including controllers, services, repositories, and security configuration.
-   `src/main/resources`: Contains configuration files, such as `application.properties`.
-   `pom.xml`: The Maven Project Object Model file, which defines project dependencies and build settings.

## API Endpoints

The API is documented using Swagger UI. Once the backend application is running, you can access the interactive API documentation at:

[`http://localhost:8080/swagger-ui.html`](http://localhost:8080/swagger-ui.html)

This interface allows you to explore and test all available API endpoints.

## Testing

This project uses **Vitest** for unit testing. You can run the tests with the following commands:

-   **Run all tests in the console:**
    ```bash
    npm test
    ```

-   **Run tests with a UI:**
    ```bash
    npm test:ui
    ```

-   **Generate a test coverage report:**
    ```bash
    npm test:coverage
    ```
