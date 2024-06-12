import { useState } from "react";

import "./App.css";

import WebApp from "@twa-dev/sdk";
import TelegramUserInfo from "./components/TelegramUserInfo";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>xxxNathan_tma_bot</h1>
      <TelegramUserInfo />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          计数是 {count}
        </button>
      </div>
      {/* 在此处添加带有警告回调的按钮 */}
      <div className="card">
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          显示警告
        </button>
      </div>
    </>
  );
}

export default App;
