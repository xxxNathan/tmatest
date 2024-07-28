// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get, $post } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import IconSearch from "@/assets/images/icon_search.png";

const Home = () => {
  const navigate = useNavigate();
  const [categorieList, setCategorieList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [newList, setNewList] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [hotCate, setHotCate] = useState([]);

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
  useEffect(() => {
    (async () => {
      console.log("token");
      const token = localStorage.getItem("token") || false;
      if (token) {
        if (categorieList.length > 0) return false;
        const categoryRes = await $get("categories");
        console.log("v1/categories---------------", categoryRes);
        setCategorieList(categoryRes?.data?.list);

        const newRes = await $get("/mini_apps/new");
        setNewList(newRes.data.list);
        const hotRes = await $get("/mini_apps/hot");
        setHotList(hotRes.data.list);
        console.log("hotRes", hotRes.data.list);

        const hostCateRes = await $get("/mini_apps/hot_category");
        console.log("v1/categories---------------", hostCateRes.data.list[0]);
        setHotCate(hostCateRes.data.list);
        // setName(hostCateRes.data.list[0].category.name);
        // await onInvitationCode();
        // await getUserPoints();
      }
    })();
  }, []);
  const onCategories = async (name, value = "") => {
    navigate("/lists", { state: { name: name, value: value } });
  };

  const goTask = async () => {
    navigate("/task");
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="flex p-20 w-full ">
        <div className="bg-gray-200 w-full h-38 rounded-xl flex flex-row items-center px-20">
          <input value={inputValue} onChange={handleInputChange} type="text" placeholder="Search" className="w-full" />
        </div>
        <div>
          <img
            className="w-38 h-38 ml-10"
            src={IconSearch}
            onClick={() => {
              onCategories("search", inputValue);
            }}
          />
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll pl-5 w-full my-10 h-36 ">
        {/* categories */}
        {categorieList.length > 0 &&
          categorieList.map((item, i) => {
            return (
              <div
                key={i}
                className="py-4 h-36 flex-shrink-0 whitespace-nowrap  px-20 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center"
                onClick={() => {
                  onCategories("id", item.id);
                }}
              >
                {/* <img
                  className="mr-5 w-16 h-16 rounded-xl"
                  src={item.logo_url}
                  alt=""
                /> */}
                <span className="text-14">{item.name}</span>
              </div>
            );
          })}
      </div>
      {/* <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-18">最近Open</h1>
        </div>
        <div className="flex flex-row overflow-x-scroll pl-10 w-full py-5">
          <div className="flex flex-col mr-8 items-center justify-center w-80 flex-shrink-0">
            <img className="w-60 h-60 rounded-xl" src={img1} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full">namenamenamename</span>
          </div>
        </div>
      </div> */}
      <div
        onClick={() => {
          goTask();
        }}
        className="flex justify-between flex-row py-10 px-20 items-center fixed bottom-50 bg-blue-500 rounded-2xl left-1/2 -ml-60 text-white text-16"
      >
        Task Center
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-20">New</h1>
          <span
            className="text-16 text-sky-600"
            onClick={() => {
              onCategories("new");
            }}
          >
            See All
          </span>
        </div>
        <div className="flex flex-col px-20 min-h-100">
          {newList.length > 0 &&
            newList.slice(0, 3).map((item, i) => {
              return (
                <div className="flex items-center mb-20" key={i}>
                  <img className="w-50 h-50 mr-10 rounded-xl" src={item.logo_url} alt="" />

                  <div className="flex-1 overflow-hidden flex flex-col justify-center">
                    <h3 className="text-16 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {item.name}
                    </h3>

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
                    Open
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-20">Hot</h1>
          <span
            className="text-16 text-sky-600"
            onClick={() => {
              onCategories("hot");
            }}
          >
            See All
          </span>
        </div>
        <div className="flex flex-col px-20 min-h-100">
          {hotList.length > 0 &&
            hotList.slice(0, 3).map((item, i) => {
              return (
                <div className="flex items-center mb-20" key={i}>
                  <img className="w-50 h-50 mr-10 rounded-xl" src={item.logo_url} alt="" />

                  <div className="flex-1 overflow-hidden flex flex-col justify-center">
                    <h3 className="text-16 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {item.name}
                    </h3>

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
                    Open
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      {hotCate.length > 0 &&
        hotCate.map((item, i) => {
          return (
            <div className="flex flex-col " key={i}>
              <div className="flex justify-between flex-row p-20 items-center ">
                <h1 className="text-20">{item.category && item.category.name}</h1>
                <span
                  className="text-16 text-sky-600"
                  onClick={() => {
                    onCategories("id", item.category.id);
                  }}
                >
                  See All
                </span>
              </div>
              {item.apps &&
                item.apps.length > 0 &&
                item.apps.slice(0, 3).map((items, y) => {
                  return (
                    <div className="flex flex-col px-20" key={y}>
                      <div className="flex items-center mb-20">
                        <img className="w-50 h-50 mr-10 rounded-xl" src={items.logo_url} alt="" />

                        <div className="flex-1 overflow-hidden flex flex-col justify-center">
                          <h3 className="text-16 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {items.name}
                          </h3>

                          <p className="text-14 text-gray-600 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {items.description}
                          </p>
                        </div>
                        <button
                          className="ml-20 px-15 py-6 bg-blue-500 text-white text-14 rounded-2xl"
                          onClick={() => {
                            onOpenTMA(items);
                          }}
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Home;
