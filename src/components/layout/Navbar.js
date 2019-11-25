import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

//TODO, HREF, arreglar que quan esta modo movil queda una petita linea al ocultar el menu, apareix a css.grid tut wes bos

const Navbar = ({isAuthenticated}) => {
  function toggleNav(event) {
    const target = event.target;
    const expanded = target.getAttribute("aria-expanded") === "true" || false;
    target.setAttribute("aria-expanded", !expanded);
  } 

  const guestLinks = (
    <ul id="menu-list">
      <li className="logo">
        <div>NOMEMPRESA</div>
      </li>
      <li>
        <Link to="/about">
          <span role="img" aria-label="navbar-emoji">
            🌍
          </span>{" "}
          About
        </Link>
      </li>
      <li>
        <Link to="/register">
          <span role="img" aria-label="navbar-emoji">
            👤
          </span>{" "}
          Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span role="img" aria-label="navbar-emoji">
            🗝️
          </span>{" "}
          Login
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul id="menu-list">
      <li className="logo">
        <div>NOMEMPRESA</div>
      </li>
      <li>
        <Link to="/about">
          <span role="img" aria-label="navbar-emoji">
            🌍
          </span>{" "}
          About
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <span role="img" aria-label="navbar-emoji">
            🏠️
          </span>{" "}
          Home
        </Link>
      </li>
      <li>
        <Link to="/overview">
          <span role="img" aria-label="navbar-emoji">
            👤
          </span>{" "}
          Profile
        </Link>
      </li>
  </ul>
  );
  return (
    <nav className="menu">
      <button
        onClick={e => toggleNav(e)}
        aria-expanded="false"
        aria-controls="menu-list"
      >
        <span className="open">☰</span>
        <span className="close">×</span>
        Menu
      </button>
      <Fragment>
        {isAuthenticated ? userLinks : guestLinks}
      </Fragment>

    </nav>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Navbar);
