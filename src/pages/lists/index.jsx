// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import { useLocation } from "react-router-dom";
const Lists = () => {
  const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { name } = location.state || {};
  useEffect(() => {
    console.log("token");
    const token = localStorage.getItem("token") || false;
    if (token) {
      const response = $get("categories");
      console.log("v1/categories", response);
    }
  }, []);
  useEffect(() => {
    (async () => {
      console.log("name", name);
      if (name == "new") {
        const newRes = await $get("/mini_apps/new");
        setList(newRes.data.list);
      } else if (name == "hot") {
        const hotRes = await $get("/mini_apps/hot");
        setList(hotRes.data.list);
      } else {
        const categoryRes = await $get(`/mini_apps?category_id=${name}`);
        console.log("categoryRes", categoryRes.data);
        setList(categoryRes.data.list);
      }
    })();
  }, [name]);
  const onOpen = async (bot) => {
    console.log("WebApp", window.Telegram.WebApp);
    window.Telegram.WebApp.openTelegramLink(bot);
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
                    onOpen(item.bot);
                  }}
                >
                  打开
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Lists;
