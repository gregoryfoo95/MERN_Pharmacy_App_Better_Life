import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/dashboard" activeClassName="nav-link-active" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/inventory" activeClassName="nav-link-active" className="nav-link">
            Inventory
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/link" activeClassName="nav-link-active" className="nav-link">
            Link
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
