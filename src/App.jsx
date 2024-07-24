import { useEffect, useState } from "react";
import { $post } from "@/api/axios";
import useTelegram from "@/hooks/useTelegram";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/router";
let init_data =
  "query_id=AAFgGzg6AwAAAGAbODoG8mvn&user=%7B%22id%22%3A7419206496%2C%22first_name%22%3A%22dfv%22%2C%22last_name%22%3A%22hnn%22%2C%22username%22%3A%22aptest1111%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721742911&hash=2e0dcb7632b53b532a9f943f8a887f342bf37e400412eb4444f0f8dabef25a1a";
// eslint-disable-next-line react/prop-types
const App = ({ initialInviteCode }) => {
  const { isTma, initData } = useTelegram();
  const [token, setToken] = useState(false);

  // useEffect(() => {
  //   console.log("isTma", isTma, initData);
  //   (async () => {
  //     if (isTma && initData) {
  //       // await $post("users/auth", { init_data: init_data })
  //       await $post("users/auth", { init_data: initData })
  //         .then(async (response) => {
  //           console.log("users/auth", response);
  //           localStorage.setItem("token", response.data.token);
  //           await setToken(response.data.token);
  //         })
  //         .catch((error) => {
  //           console.error("Error initializing user:", error);
  //         });
  //       await $post("users/invitation_code", { code: initialInviteCode })
  //         .then((response) => {
  //           console.log("users/invitation_code--------", response);
  //         })
  //         .catch((error) => {
  //           console.error("Error initializing user:", error);
  //         });
  //     }
  //   })();
  // }, [isTma, initData]);

  useEffect(() => {
    localStorage.removeItem("token");
    $post("users/auth", { init_data: init_data })
      .then((response) => {
        console.log("users/auth", response);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.error("Error initializing user:", error);
      });
  }, []);

  // return <div className="App">{token && <Home token={token}></Home>}</div>;
  return (
    <Router>
      <div className="App">{token && <AppRoutes />}</div>
    </Router>
  );
};

export default App;
