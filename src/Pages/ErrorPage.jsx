// src/pages/ErrorPage.jsx
import React from "react";
import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
      <h1 className="text-6xl font-bold text-primary mb-4">Oops!</h1>
      <p className="text-lg mb-6">
        Sorry, an unexpected error has occurred.
      </p>

      {/* Show status/message if available */}
      <p className="italic text-error mb-8">
        {error?.statusText || error?.message || "Page not found."}
      </p>

      <div className="flex gap-4">
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/contact" className="btn btn-ghost">Contact Support</Link>
      </div>
    </div>
  );
}
