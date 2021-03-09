import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const menuBar = user ? (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </nav>
  ) : (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
  return menuBar;
}

export default NavBar;
