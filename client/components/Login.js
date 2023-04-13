import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (!data.token) {
        setError("Invalid email or password");
        return;
      }

      navigate("/user/profile");
    } catch (error) {
      console.log(error.response.data);
      setError("Invalid email or password");
    }
  };

  const handleCreateAccount = () => {
    navigate("/registration");
  };

  return (
    <div>
      <label>
        User Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
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
      <button onClick={handleCreateAccount}>Create Account</button>
      <br />
      {error && <h2>{error}</h2>}
    </div>
  );
};

export default Login;
