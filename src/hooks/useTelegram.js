import { useState, useEffect } from "react";

const useTelegram = () => {
  const [isTma, setIsTma] = useState(false);
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("tg", tg);
      tg.ready();
      setIsTma(true);
      setInitData(tg.initData);
    }
  }, []);

  return { isTma, initData };
};

export default useTelegram;
