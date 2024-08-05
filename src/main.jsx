import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";
// import WebApp from "@twa-dev/sdk";
// import WebApp from "./utils/tg-webapp";
import "./utils/tg-webapp";

// import VConsole from "vconsole"; // 引入 vConsole
import { InviteCodeProvider } from "@/hooks/InviteCodeContext";

// WebApp.ready();
window.Telegram.WebApp.ready(() => {
  console.log("WebApp is ready!");
});

// new VConsole();
console.clear();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InviteCodeProvider>
      <App
        initialInviteCode={window.Telegram.WebApp.initDataUnsafe.start_param}
      />
    </InviteCodeProvider>
  </React.StrictMode>
);
