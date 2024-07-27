// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get, $post } from "@/api/axios";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const Lists = () => {
  const [list, setList] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState([]);
  const location = useLocation();
  const { name, value } = location.state || {};

  useEffect(() => {
    (async () => {
      console.log("name-value", name, value);
      let resList = [];
      switch (name) {
        case "new":
          resList = await $get("/mini_apps/new");
          break;
        case "hot":
          resList = await $get("/mini_apps/hot");
          break;
        case "search":
          console.log("search", value);
          resList = await $get(`/mini_apps?keyword=${value}`);
          break;
        case "id":
          resList = await $get(`/mini_apps/category?category_id=${value}&limit=10&form=${cursor}`);
          setCursor(resList?.data?.cursor);
          break;
        default:
          console.log(`Unknown name: ${name}`);
      }
      setList(resList.data.list);
    })();
  }, [name]);

  const onOpenTMA = async (bot) => {
    console.log("onOpenTMA", bot);

    $post("operation_logs", {
      source: bot.tag,
      target: "MINI_APP",
      target_id: bot.id,
      operation: "OPEN_MINI_APP",
    })
      .then((res) => {
        console.log("res", res);
        window.Telegram.WebApp.openTelegramLink(bot.bot);
      })
      .catch((error) => {
        console.error("Error initializing user:", error);
      });
  };
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="flex flex-col p-20">
        {list &&
          list.length > 0 &&
          list.map((item, i) => {
            return (
              <div className="flex items-center mb-20" key={i}>
                <img className="w-50 h-50 mr-10 rounded-xl" src={item.logo_url} alt="" />

                <div className="flex-1 overflow-hidden flex flex-col justify-center">
                  <h3 className="text-16 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{item.name}</h3>

                  <p className="text-14 text-gray-600 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.description}
                  </p>
                </div>
                <button
                  className="ml-20 px-15 py-6 bg-blue-500 text-white text-14 rounded-2xl"
                  onClick={() => {
                    onOpenTMA(item);
                  }}
                >
                  打开
                </button>
              </div>
            );
          })}
        {list && list.length == 0 && <div>No Data</div>}
      </div>
    </div>
  );
};

export default Lists;
