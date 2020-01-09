import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
//TODO, HREF, arreglar que quan esta modo movil queda una petita linea al ocultar el menu, apareix a css.grid tut wes bos

const Navbar = ({isAuthenticated}) => {

  const guestLinks = (
    <ul className="nav-list">
      <li className="nav-list__item">
        <Link to="/" className="nav-list__link">
          <svg className="nav-list__icon nav-list__icon--logo">
              <use xlinkHref='/sprite.svg#icon-ballot'></use>
          </svg>
          <span className="logo-name">Minimal tracker</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/about" className="nav-list__link">
          <svg className="nav-list__icon">
            <use xlinkHref='/sprite.svg#icon-public'></use>
          </svg>
            <span>About</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/register" className="nav-list__link">
          <svg className="nav-list__icon">
            <use xlinkHref="/sprite.svg#icon-person_add"></use>
          </svg>
          <span>Register</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/login" className="nav-list__link">
        <svg className="nav-list__icon">
            <use xlinkHref="/sprite.svg#icon-vpn_key"></use>
          </svg>
          <span>Login</span>
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className="nav-list">
    <li className="nav-list__item">
        <Link to="/" className="nav-list__link">
          <svg className="nav-list__icon nav-list__icon--logo">
              <use xlinkHref='/sprite.svg#icon-ballot'></use>
          </svg>
          <span className="logo-name">Minimal tracker</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/about" className="nav-list__link">
          <svg className="nav-list__icon">
            <use xlinkHref='/sprite.svg#icon-public'></use>
          </svg>
          <span>About</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/dashboard" className="nav-list__link">
          <svg className="nav-list__icon">
            <use xlinkHref="/sprite.svg#icon-house"></use>
          </svg>
          <span>Home</span>
        </Link>
      </li>
      <li className="nav-list__item">
        <Link to="/overview" className="nav-list__link">
          <svg className="nav-list__icon">
            <use xlinkHref="/sprite.svg#icon-person"></use>
          </svg>
          <span>Profile</span>
        </Link>
      </li>
  </ul>
  );
  return (
    <nav className="navbar">
        {isAuthenticated ? userLinks : guestLinks}
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
