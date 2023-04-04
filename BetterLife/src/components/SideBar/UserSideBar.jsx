import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const UserSideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/user" activeclassname="nav-link-active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/map"
            activeclassname="nav-link-active"
            className="nav-link"
          >
            Map
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact-us"
            activeclassname="nav-link-active"
            className="nav-link"
          >
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/profile"
            activeclassname="nav-link-active"
            className="nav-link"
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/reset"
            activeclassname="nav-link-active"
            className="nav-link"
          >
            Reset
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default UserSideBar;