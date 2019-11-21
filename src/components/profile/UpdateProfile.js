import React,{useState} from "react";
import {connect} from 'react-redux';
import {updateProfile} from '../../actions/profile';

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
    })
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    updateProfile(JSON.stringify(formData));
    cleanFields();
  }

  return (
    <section className="edit-profile">
      <h1 className="title">Update your profile</h1>
      <form className="profile-form" action="post" onSubmit={e => handleSubmit(e)}>
        <input type="text" placeholder=" Write your current role" name="role" value={role} onChange={e => handleChange(e)} />
        <label>
          Post your current professional role (eg. Product Engineer)
        </label>
        <input type="text" placeholder=" Location" name="location" value={location} onChange={e => handleChange(e)}/>
        <label>City & Province suggested (eg. Terrassa, Barcelona)</label>
        <textarea placeholder="A short bio about yourself" name="bio" value={bio} onChange={e => handleChange(e)}></textarea>
        <label>Update your current bio</label>
        <hr/>
        <input type="submit" value="Submit"/>
      </form>
    </section>
  );
};

export default connect(null, {updateProfile})(UpdateProfile);
