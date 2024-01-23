import React from "react";
import "../styles/Layout1.css";
import { Link, useLocation } from "react-router-dom";
import { DoctorMenu } from "./../Data/data";

const DocLayout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Dr. Nearme</h6>
              <hr></hr>
            </div>

            <div className="menu">
              {DoctorMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">View the Appointments</div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DocLayout;