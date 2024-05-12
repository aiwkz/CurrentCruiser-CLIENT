# CurrentCruiser-Client

Final project for the FullStack module for the Professional Master in Web Development and Conceptualization at CEI Valencia

## Introduction

Welcome to **CurrentCruiser**, the final project for the FullStack module of the Professional Master in Web Development and Conceptualization at CEI Valencia. This project aims to create a comprehensive platform focusing on electric cars, including their history, available brands and models, technological advancements, and user-generated lists of favorite electric cars.

## Project Description

The CurrentCruiser Client is the frontend interface for interacting with the CurrentCruiser API. It provides a user-friendly web application allowing users to browse car listings, create and manage custom lists, register, log in, and interact with various features of the platform.

## Features

-   User Authentication: Register, log in, and log out.
-   Car Browsing: View and search through available car listings.
-   List Creation: Create custom lists of favorite cars.
-   List Management: Add, edit, and delete cars from custom lists.
-   User Profile Management: Update user profile information.
-   Responsive Design: Ensure a seamless experience across devices of all sizes.

The client is built using React.js, leveraging modern web development technologies to deliver a fast, interactive, and intuitive user experience.

## Technologies Used

-   React.js
-   React Router
-   CSS Modules

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Define the following variables in the `.env` file:
        ```
        VITE_BACKEND_URL=<your_backend_url>
        ```
5. Start the development server with `npm run dev`.

## Routes

-   `/`: Home page displaying car listings and user-specific lists.
-   `/login`: Login page for existing users.
-   `/register`: Registration page for new users.
-   `/profile`: User profile page for managing account settings.

## Error Handling

Error messages and alerts are displayed to users when encountering validation errors or failed API requests.

## Responsive Design

The application is designed to be fully responsive, ensuring a consistent experience across various devices.

## Acknowledgements

We would like to express our gratitude to Tomás Sánchez for his guidance and support throughout the FullStack module, providing invaluable insights and mentorship to help us develop this project.
