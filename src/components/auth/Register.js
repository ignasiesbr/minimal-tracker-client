import React,{useState} from "react";
import {register} from '../../actions/auth';
import { connect  } from 'react-redux';
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom';

const Register = ({register, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password: "",
    password2: "",
    isAdmin: false,
  });

  const {name, email, password, password2, isAdmin} = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    register(name, email, password, password2, isAdmin);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard"  />
  }
  
  return (
      <section className="auth-form">
          <form className="form" onSubmit={e => handleSubmit(e)}>
            <h1 className="heading-primary u-margin-bottom-small">Register</h1>
            <label className="form__label" htmlFor="username">Username</label>
            <input className="form__input" required type="text" placeholder="🕵︎ Type your username" id="username" name="name" onChange={e => handleChange(e)}/>
            <label className="form__label" htmlFor="email">Email</label>
            <input className="form__input" required type="email" placeholder="🕵︎ Type your email" id="email" name="email" onChange={e => handleChange(e)}/>
            <label className="form__label" htmlFor="password">Password</label>
            <input  className="form__input" required type="password" placeholder="🔒︎ Type your password" id="password" name="password" onChange={e => handleChange(e)}/>
            <label className="form__label" htmlFor="password2">Repeat your password</label>
            <input className="form__input" required type="password" id="password2" placeholder="🔒︎ Repeat your password" name="password2" onChange={e => handleChange(e)}/>
            <label htmlFor="admin" className="form__label">Do you want to be an admin? Mark the checkbox to register as so.</label>
            <input id="admin" type="checkbox" onClick={() => setFormData({...formData, isAdmin: !formData.isAdmin})}/>
            <label htmlFor="terms" className="form__label">I agree the <Link target="_blank" to="/terms">terms and conditions</Link> of the site</label>
            <input id="terms" type="checkbox" required/>
            <input type="submit" value="Register" className="form__submit btn btn-link u-margin-bottom-medium" />
          </form>
      </section>
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
