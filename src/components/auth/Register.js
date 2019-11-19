import React,{useState} from "react";
import {register} from '../../actions/auth';
import { connect  } from 'react-redux';
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom';

const Register = ({register, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password: "",
    password2: ""
  });

  const {name, email, password, password2} = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    register(name, email, password, password2);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard"  />
  }
  
  return (
    <div id="wrapper">
      <section className="auth-form">
        <div className="container">
          <h1>Register</h1>
          <form className="login-form" onSubmit={e => handleSubmit(e)}>
            <h2>Username</h2>
            <input type="text" placeholder="🕵︎ Type your username" name="name" onChange={e => handleChange(e)}/>
            <h2>Email</h2>
            <input type="text" placeholder="🕵︎ Type your email" name="email" onChange={e => handleChange(e)}/>
            <h2>password</h2>
            <input type="password" placeholder="🔒︎ Type your password" name="password" onChange={e => handleChange(e)}/>
            <h2>Repeat your password</h2>
            <input type="password" placeholder="🔒︎ Repeat your password" name="password2" onChange={e => handleChange(e)}/>
            <input type="submit" value="Register" className="login-submit" />
          </form>
        </div>
      </section>
    </div>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);
