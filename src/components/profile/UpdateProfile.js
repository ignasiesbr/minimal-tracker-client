import React from "react";

const UpdateProfile = () => {
  return (
    <section class="edit-profile">
      <h1 class="title">Update your profile</h1>
      <form class="profile-form">
        <input type="text" placeholder=" Email" />
        <label>Change your mail. This changes your access credentials</label>
        <input type="text" placeholder=" Write your current role" />
        <label>
          Post your current professional role (eg. Product Engineer)
        </label>
        <input type="text" placeholder=" Location" />
        <label>City & Province suggested (eg. Terrassa, Barcelona)</label>
        <textarea placeholder="A short bio about yourself"></textarea>
        <label>Update your current bio</label>
      </form>
    </section>
  );
};

export default UpdateProfile;
