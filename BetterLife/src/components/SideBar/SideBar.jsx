import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
      <li className="nav-item">
          <NavLink to="/" activeclassname="nav-link-active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard" activeclassname="nav-link-active" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/medicine" activeclassname="nav-link-active" className="nav-link">
            Medicine
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact-us" activeclassname="nav-link-active" className="nav-link">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
