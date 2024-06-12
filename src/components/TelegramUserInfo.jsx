import { useEffect, useState } from "react";

const TelegramUserInfo = () => {
  const [user, setUser] = useState(null);
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const initDataRaw = tg.initData;
    const user = tg.initDataUnsafe?.user;

    setInitData(parseInitData(initDataRaw));

    if (user) {
      setUser(user);
    } else {
      setUser({ first_name: "User", last_name: "Not found", username: "" });
    }
  }, []);

  const parseInitData = (data) => {
    const params = new URLSearchParams(data);
    const initDataObj = {};
    for (const [key, value] of params.entries()) {
      initDataObj[key] = value;
    }
    return initDataObj;
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>User Information</h2>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
      {initData && (
        <div>
          <h2>Init Data</h2>
          <pre>
            <code>{JSON.stringify(initData, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default TelegramUserInfo;
