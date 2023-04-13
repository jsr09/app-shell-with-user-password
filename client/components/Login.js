import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // hardcoded username and password for demo purposes
    const validUsername = "myusername";
    const validPassword = "mypassword";

    // verify the entered username and password
    if (username === validUsername && password === validPassword) {
      // if login is successful, navigate to profile page
      navigate("/profile");
    } else {
      // if login is unsuccessful, show an error message
      console.log("Invalid username or password");
    }
  };


  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
