import { useEffect, useState } from "react";

const TelegramUserInfo = () => {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const initDataRaw = tg.initData;
    const parsedInitData = parseInitData(initDataRaw);
    setInitData(parsedInitData);
  }, []);

  const parseInitData = (data) => {
    const params = new URLSearchParams(data);
    const initDataObj = {};
    for (const [key, value] of params.entries()) {
      try {
        initDataObj[key] = JSON.parse(value);
      } catch (e) {
        initDataObj[key] = value;
      }
    }
    return initDataObj;
  };

  return (
    <div>
      {initData ? (
        <div>
          <h2>Init Data</h2>
          <pre>
            <code>{JSON.stringify(initData, null, 2)}</code>
          </pre>
        </div>
      ) : (
        <p>Loading init data...</p>
      )}
    </div>
  );
};

export default TelegramUserInfo;
