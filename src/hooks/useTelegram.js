import { useState, useEffect } from "react";

const useTelegram = () => {
  const [isTma, setIsTma] = useState(false);
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (window.Telegram && window.Telegram.WebApp) {
      tg.ready();
      setIsTma(true);
      setInitData(tg);
    }
  }, []);

  return { isTma, initData };
};

export default useTelegram;
