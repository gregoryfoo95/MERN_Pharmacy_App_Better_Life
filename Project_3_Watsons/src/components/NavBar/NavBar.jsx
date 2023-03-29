import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" activeClassName="nav-link-active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/account" activeClassName="nav-link-active" className="nav-link">
            Account
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" activeClassName="nav-link-active" className="nav-link">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
