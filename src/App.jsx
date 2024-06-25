import React, { useEffect } from "react";
import axios from "axios";
import TelegramUserInfo from "./components/TelegramUserInfo";
import useTelegram from "./hooks/useTelegram";
let initData =
  "query_id=AAFCOWJ6AAAAAFyhYnoe-IRk&user=%7B%22id%22%3A2053284188%2C%22first name%22%3A%22x%22%2C%22last name%22%3A%22nathan%22%2C%22username%22%3A%22nathan2345%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth date=1719297451&hash=cfc5ddc307e8d28b8b33742a338cee13f24386b03853b347b2a51acd83fe2678";
const App = () => {
  // const { isTma, initData } = useTelegram();

  // useEffect(() => {
  //   if (isTma && initData) {
  //     axios
  //       .post("http://imhagv.natappfree.cc/v1/users/auth", { initData })
  //       .then((response) => {
  //         console.log("User initialized:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error initializing user:", error);
  //       });
  //   }
  // }, [isTma, initData]);

  useEffect(() => {
    axios
      .post(
        "http://imhagv.natappfree.cc/v1/users/auth",
        { initData: initData },
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:5173",
          },
        }
      )
      .then((response) => {
        console.log("User initialized:", response.data);
      })
      .catch((error) => {
        console.error("Error initializing user:", error);
      });
  }, []);

  return (
    <div className="App">
      <TelegramUserInfo></TelegramUserInfo>
      <h1>Welcome to My React App,{initData ? initData : ""}</h1>
      {/* {isTma && <p>You are in Telegram Mini App environment</p>} */}
    </div>
  );
};

export default App;
