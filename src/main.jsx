import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";
import WebApp from "@twa-dev/sdk";
import VConsole from "vconsole"; // 引入 vConsole
import { InviteCodeProvider } from "@/hooks/InviteCodeContext";

WebApp.ready();

new VConsole();
console.clear();
console.log(
  "WebApp.initDataUnsafe.start_param------------",
  WebApp.initDataUnsafe.start_param
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InviteCodeProvider>
      <App initialInviteCode={WebApp.initDataUnsafe.start_param} />
    </InviteCodeProvider>
  </React.StrictMode>
);
