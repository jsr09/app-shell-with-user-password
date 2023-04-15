import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import config from "./config";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <ConfigProvider config={config}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
