



import { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();


  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const closeMobileNavbar = () => {
    hamburger.current.classList.remove("is-active");
    navbar.current.classList.remove("is-active");

  };







  return (
    <nav
      className="navbar is-success is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img height="3rem" src={require('../images/pantryicon.jpg')} />
          <h1 className="title is-4 custom-font" style={{ marginLeft: '1rem' }}> PantryCheck</h1>
        </a>


        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar} >
        <div className="navbar-item-container">
          <div>
            {token ? (
              <NavLink to="/" exact activeClassName="active" className="navbar-item" onClick={closeMobileNavbar}>
                Home
              </NavLink>
            ) : (
              ""
            )}
          </div>

         <div>
            {token ? (
              <NavLink to="/lists"  activeClassName="active" className="navbar-item" onClick={closeMobileNavbar}>
                Grocery Lists
              </NavLink>
            ) : (
              ""
            )}
          </div>

         <div>
            {token ? (
              <NavLink to="/items"  activeClassName="active" className="navbar-item" onClick={closeMobileNavbar}>
                Grocery Items
              </NavLink>
            ) : (
              ""
            )}
          </div>

         <div>
            {token ? (
              <NavLink to="/locations"  activeClassName="active" className="navbar-item" onClick={closeMobileNavbar}>
                Find A Store
              </NavLink>
            ) : (
              ""
            )}
          </div>





        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                    closeMobileNavbar();
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink activeClassName="active" to="/register" className="button is-outlined" onClick={closeMobileNavbar}>
                    Register
                  </NavLink>
                  <NavLink activeClassName="active" to="/login" className="button is-outlined" onClick={closeMobileNavbar}>
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

