import React from "react";
import error404Img from "/error_404.svg";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <img
        src={error404Img}
        alt="404-error not found"
        height="400"
        width="400"
      />
      <h1 className="text-4xl font-bold text-center mt-10">404 Not Found</h1>
      <p className="text-lg text-center mt-5">
        The page you are looking for does not exist.
      </p>

      <Link className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-lg" to="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default Error404;
