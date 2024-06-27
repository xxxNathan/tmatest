import { useEffect, useState } from "react";
import { $post } from "@/api/axios";
import Home from "@/pages/home/index";
import useTelegram from "@/hooks/useTelegram";
let init_data =
  "query_id=AAFcoWJ6AAAAAFyhYnqqu9Sv&user=%7B%22id%22%3A2053284188%2C%22first_name%22%3A%22x%22%2C%22last_name%22%3A%22nathan%22%2C%22username%22%3A%22nathan2345%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1719370655&hash=7994c2936a9bf6f38263daaa4f03c23817d129534fdce7914223dd57529dfe05";
const App = () => {
  const { isTma, initData } = useTelegram();
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   console.log("isTma", isTma);
  //   console.log("initData", initData);
  //   if (isTma && initData) {
  //     api
  //       .post(
  //         "https://orca-summary-oryx.ngrok-free.app/v1/users/auth",
  //         { init_data: init_data },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("User initialized:", res.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error initializing user:", error);
  //       });
  //   }
  // }, [isTma, initData]);

  useEffect(() => {
    localStorage.removeItem("token");
    $post("users/auth", { init_data: init_data })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.error("Error initializing user:", error);
      });
  }, []);

  return <div className="App">{token && <Home token={token}></Home>}</div>;
};

export default App;
