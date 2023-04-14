import {React, useEffect, useState} from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No JWT token found.");
        return;
      }
      const {data} = await axios.get("/api/user/profile");

      if (!data) {
        const error = await data.json();
        console.error(error);
        return;
      }
      setUser(data);
    }
    fetchUserProfile();
  }, []);

    return (
      <>
        {error ? (
          <p>User not found</p>
        ) : (
          <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </>
    );

}

export default Profile;
