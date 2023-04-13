import React from "react";
import axios from "axios";

const Profile = ({ username, email }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default Profile;
