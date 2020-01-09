import React,{useState} from "react";
import {connect} from 'react-redux';
import {updateProfile} from '../../actions/profile';
import UpdateAvatar from '../profile/UpdateAvatar';

const UpdateProfile = ({updateProfile}) => {

  const [formData, setFormData ] = useState({
    role:"", location:"", bio:"" 
  })

  const {role, location, bio} = formData;

  const cleanFields = () => {
    setFormData({
      role:"",
      location:"",
      bio:""
    });
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProfile(JSON.stringify(formData));
    cleanFields();
  }

  return (
    <section className="update-profile">
      <h1 className="heading-primary">Update your profile</h1>
      <UpdateAvatar/>
      <form className="form2" action="post" onSubmit={e => handleSubmit(e)}>
        <label className="form2__label" >
          Post your current professional role (eg. Product Engineer)
        </label>
        <input className="form2__input u-margin-bottom-medium" type="text" placeholder=" Write your current role" name="role" value={role} onChange={e => handleChange(e)} />
        <label  className="form2__label">City & Province suggested (eg. Terrassa, Barcelona)</label>
        <input  className="form2__input u-margin-bottom-medium" type="text" placeholder=" Location" name="location" value={location} onChange={e => handleChange(e)}/>
        <label  className="form2__label">Update your current bio</label>
        <textarea className="form2__textarea u-margin-bottom-medium" placeholder="A short bio about yourself" name="bio" value={bio} onChange={e => handleChange(e)}></textarea>
        <input className="btn2 u-margin-bottom-medium" type="submit" value="Submit"/>
      </form>
    </section>
  );
};

export default connect(null, {updateProfile})(UpdateProfile);
