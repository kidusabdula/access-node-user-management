AccessNode - User Management App
Overview
Welcome to the AccessNode User Management App! This application is a full-stack web app built using Next.js, PostgreSQL, and several modern frontend tools and libraries. The app allows users to sign up, sign in, and manage their accounts. Once logged in, users can view a list of all signed-up users. This project uses JWT-based authentication, and it is secured using HTTP-only cookies. The frontend UI is built using Shadcn UI, React Query, Zod, and Tailwind CSS.

Features
User Registration: Users can sign up using their email and password.
User Authentication: JWT and HTTP-only cookies are used to authenticate users.
User Login: Users can log in using their credentials.
User Logout: Users can sign out, which invalidates their session.
User List: Authenticated users can view a list of all registered users.
Protected Routes: The user list is only accessible to authenticated users.

Tech Stack

Frontend:

Next.js (React framework for building the app and implementing SSR/API routes)
Tailwind CSS (For styling the app)
Shadcn UI (For UI components like buttons, forms, and tables)
React Query (For managing server state and API data)
React Hook Form (For managing and validating forms)
Zod (For input and API request validation)

Backend:

PostgreSQL (Relational database to store user data)
JWT (For secure authentication and authorization)
Bcrypt (For hashing passwords)


Additional Libraries:

Prisma (ORM for interacting with the PostgreSQL database)
Toast Notifications (For displaying toast messages in the app)

Requirements

Core Functionality

User Authentication:

Users can sign up and log in using their email and password.
JWT tokens are used for authentication and are stored in HTTP-only cookies for security.
A secure, HTTP-only cookie is set upon successful login.


Protected Routes:

Routes are protected to ensure that only authenticated users can access the user list.

PostgreSQL Database:

PostgreSQL is used to store user credentials and other necessary user information.

Frontend:

The frontend uses Next.js, Shadcn UI, React Query, and React Hook Form.
The UI is styled with Tailwind CSS, and Zod is used for form validation.
API Routes and Authentication

POST /api/auth/signup:

Registers a new user by hashing the password with bcrypt and saving the user data in PostgreSQL.

POST /api/auth/login:

Authenticates the user, generates a JWT token, and sets an HTTP-only cookie.

POST /api/auth/logout:

Logs out the user by clearing the JWT cookie.

GET /api/users:

Fetches a list of all users from the database, accessible only to authenticated users.

Setting Up the Project Locally

Follow the steps below to set up and run the project locally.

1. Clone the Repository

Clone the repository from GitHub to your local machine.

git clone gh repo clone kidusabdula/access-node-user-management
https://github.com/kidusabdula/access-node-user-management.git
cd AccessNode


2. Install Dependencies

Install the necessary dependencies using npm or yarn.
npm install
# or
yarn install


3. Set Up Environment Variables

Create a .env.local file in the root of the project and configure the following environment variables:

JWT_SECRET=your-very-secure-secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgres://postgres:1015@localhost:5000/access-node-db 


4. Set Up the Database

Install PostgreSQL if you don't already have it.
Run the following command to create the database:

createdb accessnode_db
Run Prisma Migrations to set up the database schema.

npx prisma migrate dev --name init
After the migration completes, you should have a users table in your PostgreSQL database.

5. Start the Development Server

Run the app in development mode:

npm run dev
# or
yarn dev
The app will be available at http://localhost:3000.

Features and Implementation

User Registration

The user registration form collects the user's email and password. It uses React Hook Form for form management and Zod for validation. When the form is submitted, the user's password is hashed using bcrypt and stored securely in the database.

User Login

Users can log in with their email and password. If the credentials are correct, a JWT is generated and sent as a secure, HTTP-only cookie. This JWT is used to authenticate future requests.

Protected Routes

The /api/users endpoint is protected using middleware that verifies the JWT cookie. Only authenticated users can access the user list.

Toast Notifications

Toast Notifications are used to display success or error messages. For example, when a user successfully logs in or logs out, a toast notification is shown.

Styling and UI

The frontend is styled using Tailwind CSS. UI components like buttons, tables, and forms are created using Shadcn UI. The design is responsive and works well on both mobile and desktop devices.

Server-Side State Management

React Query is used for fetching user data and managing server-side state. It handles API calls to fetch the user list and manages loading and error states.

Documentation

Prisma Schema
The schema.prisma file contains the database schema for the app, including the User model. Prisma handles database interactions like creating, updating, and deleting users.

React Query Hooks
React Query is used to manage server-side data fetching. For example, the useUsers hook fetches all users from the API.

React Hook Form & Zod Validation
React Hook Form is used to handle form submissions and validation.
Zod is used for input validation on both the frontend and the backend.
JWT Authentication
JWT tokens are used for authenticating users. The token is stored in an HTTP-only cookie to prevent XSS attacks. The token is verified in API routes to ensure that the user is authenticated before accessing protected routes.

Bcrypt
Bcrypt is used to hash and verify passwords. User passwords are never stored in plaintext.

Conclusion
This project is a comprehensive, full-stack user management app that demonstrates modern authentication, secure password handling, and UI development using the latest tools and libraries in the React ecosystem. By combining Next.js, PostgreSQL, JWT, Bcrypt, and various frontend libraries like Shadcn UI, React Query, and Zod, this app provides a secure, user-friendly experience for managing users.

License
This project is licensed under the MIT License - see the LICENSE file for details.