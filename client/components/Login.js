import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";

const Login = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
        remember
      });
      if (!data.token) {
        setError("Invalid email or password");
        return;
      }
      localStorage.setItem("token", data.token);
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
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        margin: "auto",
        paddingTop: 20,
        
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="User Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input value={email} onChange={(e) => setUserEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox onChange={(e) => setRemember(e.target.checked)}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button onClick={handleCreateAccount}>Create Account</Button>
      </Form.Item>
      {error && <h2>{error}</h2>}
    </Form>
  );
};

export default Login;
