import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Home Screen</h1>
      <br />
      {auth.isAuthenticated ? `Welcome, User` : "Please, login first"}
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
