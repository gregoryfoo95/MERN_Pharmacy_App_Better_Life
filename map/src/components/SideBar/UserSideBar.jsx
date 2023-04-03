import React from "react";
import { NavLink } from "react-router-dom";
import "./UserSideBar.css";

const UserSideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/" activeclassname="nav-link-active" className="nav-link">
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
            to="/medicine"
            activeclassname="nav-link-active"
            className="nav-link"
          >
            Medicine
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default UserSideBar;