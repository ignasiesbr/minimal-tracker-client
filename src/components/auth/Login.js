import React, {useState} from "react";
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';

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
    <div id="wrapper">
      <section className="auth-form">
        <div className="container">
          <h1 id="title">Login</h1>
          <form className="login-form" onSubmit={e => handleSubmit(e)}>
            <h2>Username</h2>
            <input type="text" name="email" placeholder="🕵︎ Type your email" value={email} onChange={e => handleChange(e)}/>
            <h2>password</h2>
            <input type="password" name="password" placeholder="🔒︎ Type your password" value={password} onChange={e => handleChange(e)} />
            <Link to="/">Forgot your password? Click here</Link>
            <input type="submit" value="Login" className="login-submit" />
          </form>
        </div>
      </section>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
