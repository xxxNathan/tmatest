import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
WebApp.ready();
// 向 Telegram 应用程序通知小程序已准备好显示。建议尽可能早地调用此方法，一旦加载了所有必要的接口元素。一旦调用此方法，加载的占位符将被隐藏，小程序将被显示。

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
