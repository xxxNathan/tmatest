// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const TelegramUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUser(user);
    } else {
      setUser({ first_name: "User", last_name: "Not found", username: "" });
    }
  }, []);

  return (
    <div>
      {user ? (
        <p>
          Hello, {user.first_name} {user.last_name} (@{user.username})
          <code>{user}</code>
        </p>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default TelegramUserInfo;
