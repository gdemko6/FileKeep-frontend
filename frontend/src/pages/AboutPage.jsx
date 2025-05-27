import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "FileKeep | About";
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About FileKeep</h1>

      <p className="mb-4">
        <strong>FileKeep</strong> is a full-stack file management application
        built to showcase my ability to design and implement modern, scalable
        web applications. It allows users to securely log in, create folders,
        upload and manage files, and download them at any time — all with
        protected routes and persistent sessions.
      </p>

      <p className="mb-4">
        This project was developed using a tech stack that mirrors real-world
        SaaS applications:
        <br />
        <span className="italic">
          React, Tailwind CSS, Express, PostgreSQL, Prisma, Passport.js, and
          Multer.
        </span>
      </p>

      <p className="mb-4">
        Key features include:
        <ul className="list-disc ml-6 mt-2">
          <li>Session-based authentication with protected backend routes</li>
          <li>Secure file upload and download using Multer</li>
          <li>Folder-based file organization</li>
          <li>Dynamic routing and responsive UI with Tailwind</li>
          <li>Fully separated frontend and backend for scalability</li>
        </ul>
      </p>

      <p className="mb-4">
        I built FileKeep to simulate a realistic product workflow, from setting
        up a backend API to managing state in a React frontend. Throughout this
        project, I gained deeper experience in authentication flows, file
        handling, and frontend/backend integration.
      </p>

      <p>
        This project is a demonstration of how I approach problems: building
        practical solutions, writing clean code, and prioritizing user
        experience.
      </p>
    </div>
  );
}
