"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Documentation() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 border-b text-white py-4 w-full text-center">
        <Link href={"/"}>
          <h1 className="text-2xl font-extralight">AccessNode</h1>
        </Link>
      </nav>

      <main className="flex flex-col items-center gap-8 mt-14">
        <h1 className="text-3xl font-bold text-center">
          AccessNode - User Management App
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p>
            Welcome to the <strong>AccessNode</strong> User Management App! This
            application is a full-stack web app built using
            <strong> Next.js</strong>, <strong>PostgreSQL</strong>, and several
            modern frontend tools and libraries. The app allows users to sign
            up, sign in, and manage their accounts. Once logged in, users can
            view a list of all signed-up users. This project uses JWT-based
            authentication, and it is secured using HTTP-only cookies. The
            frontend UI is built using
            <strong> Shadcn UI</strong>, <strong>React Query</strong>,{" "}
            <strong>Zod</strong>, and <strong>Tailwind CSS</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              User Registration: Users can sign up using their email and
              password.
            </li>
            <li>
              User Authentication: JWT and HTTP-only cookies are used to
              authenticate users.
            </li>
            <li>User Login: Users can log in using their credentials.</li>
            <li>
              User Logout: Users can sign out, which invalidates their session.
            </li>
            <li>
              User List: Authenticated users can view a list of all registered
              users.
            </li>
            <li>
              Protected Routes: The user list is only accessible to
              authenticated users.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tech Stack</h2>
          <h3 className="text-xl font-semibold">Frontend:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Next.js</strong> (React framework for building the app and
              implementing SSR/API routes)
            </li>
            <li>
              <strong>Tailwind CSS</strong> (For styling the app)
            </li>
            <li>
              <strong>Shadcn UI</strong> (For UI components like buttons, forms,
              and tables)
            </li>
            <li>
              <strong>React Query</strong> (For managing server state and API
              data)
            </li>
            <li>
              <strong>React Hook Form</strong> (For managing and validating
              forms)
            </li>
            <li>
              <strong>Zod</strong> (For input and API request validation)
            </li>
          </ul>

          <h3 className="text-xl font-semibold">Backend:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>PostgreSQL</strong> (Relational database to store user
              data)
            </li>
            <li>
              <strong>JWT</strong> (For secure authentication and authorization)
            </li>
            <li>
              <strong>Bcrypt</strong> (For hashing passwords)
            </li>
          </ul>

          <h3 className="text-xl font-semibold">Additional Libraries:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Prisma</strong> (ORM for interacting with the PostgreSQL
              database)
            </li>
            <li>
              <strong>Toast Notifications</strong> (For displaying toast
              messages in the app)
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Setting Up the Project Locally
          </h2>
          <p>Follow the steps below to set up and run the project locally:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Clone the repository:</li>
            <pre className="bg-black border p-4 rounded-xl overflow-x-auto">
              gh repo clone kidusabdula/access-node-user-management
            </pre>

            <li>Navigate to the project directory:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              cd AccessNode
            </pre>

            <li>Install dependencies:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              npm install
            </pre>

            <li>Set up environment variables:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              DATABASE_URL=postgres://postgres:1015@localhost:5000/access-node-db
              JWT_SECRET=your-very-secure-secret
              NEXTAUTH_URL=http://localhost:3000
            </pre>

            <li>Set up the PostgreSQL database:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              createdb accessnode_db
            </pre>

            <li>Run Prisma migrations:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              npx prisma migrate dev --name init
            </pre>

            <li>Start the development server:</li>
            <pre className="bg-black border p-4 rounded-md overflow-x-auto">
              npm run dev
            </pre>

            <p>
              The app will be available at{" "}
              <strong>http://localhost:3000</strong>.
            </p>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Features and Implementation
          </h2>
          <h3 className="text-xl font-semibold">User Registration</h3>
          <p>
            The user registration form collects the user&apos;s email and
            password. It uses <strong>React Hook Form</strong> for form
            management and <strong>Zod</strong> for validation. When the form is
            submitted, the user&apos;s password is hashed using
            <strong>bcrypt</strong> and stored securely in the database.
          </p>

          <h3 className="text-xl font-semibold">User Login</h3>
          <p>
            Users can log in with their email and password. If the credentials
            are correct, a JWT is generated and sent as a secure, HTTP-only
            cookie. This JWT is used to authenticate future requests.
          </p>

          <h3 className="text-xl font-semibold">Protected Routes</h3>
          <p>
            The <code>/api/users</code> endpoint is protected using middleware
            that verifies the JWT cookie. Only authenticated users can access
            the user list.
          </p>

          <h3 className="text-xl font-semibold">Toast Notifications</h3>
          <p>
            <strong>Toast Notifications</strong> are used to display success or
            error messages. For example, when a user successfully logs in or
            logs out, a toast notification is shown.
          </p>

          <h3 className="text-xl font-semibold">Styling and UI</h3>
          <p>
            The frontend is styled using <strong>Tailwind CSS</strong>. UI
            components like buttons, tables, and forms are created using
            <strong> Shadcn UI</strong>. The design is responsive and works well
            on both mobile and desktop devices.
          </p>

          <h3 className="text-xl font-semibold">
            Server-Side State Management
          </h3>
          <p>
            <strong>React Query</strong> is used for fetching user data and
            managing server-side state. It handles API calls to fetch the user
            list and manages loading and error states.
          </p>

          <h3 className="text-xl font-semibold">JWT Authentication</h3>
          <p>
            JWT tokens are used for authenticating users. The token is stored in
            an HTTP-only cookie to prevent XSS attacks. The token is verified in
            API routes to ensure that the user is authenticated before accessing
            protected routes.
          </p>

          <h3 className="text-xl font-semibold">Bcrypt</h3>
          <p>
            <strong>Bcrypt</strong> is used to hash and verify passwords. User
            passwords are never stored in plaintext.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Conclusion</h2>
          <p>
            This project is a comprehensive, full-stack user management app that
            demonstrates modern authentication, secure password handling, and UI
            development using the latest tools and libraries in the React
            ecosystem. By combining <strong>Next.js</strong>,
            <strong> PostgreSQL</strong>, <strong>JWT</strong>,{" "}
            <strong>Bcrypt</strong>, and various frontend technologies, we have
            built a fully-functional application that can be extended with more
            features as needed.
          </p>
        </section>

        <Button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Go Back to Home
        </Button>
      </main>
    </div>
  );
}
