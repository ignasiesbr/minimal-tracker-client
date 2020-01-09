import React, {useState} from "react";
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';
import svg from '../../assets/images/rest-girl.svg';

const Login = ({login, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  
  return (
      <section className="auth-form">
          <form className="form" onSubmit={e => handleSubmit(e)}>
            <h1 className="heading-primary u-margin-bottom-small">Login</h1>
            <label className="form__label" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="🕵︎ Type your email" className="form__input" value={email} onChange={e => handleChange(e)}/>
            <label className="form__label" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="🔒︎ Type your password" className="form__input" value={password} onChange={e => handleChange(e)} />
            <Link className="btn btn-text u-margin-bottom-medium" to="/forgot">Forgot your password? Click here</Link>
            <input type="submit" value="Login" className="form__submit btn btn-link u-margin-bottom-medium" />
          </form>
          <img src={svg} className="auth-form__image" alt="login-bg" />
      </section>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
