import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="nav-link-active" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" activeClassName="nav-link-active" className="nav-link">
            Inventory
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" activeClassName="nav-link-active" className="nav-link">
            Link
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
