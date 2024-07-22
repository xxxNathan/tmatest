// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get, $post } from "@/api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [categorieList, setCategorieList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [hotCate, setHotCate] = useState([]);
  const [cateName, setName] = useState("");

  // const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    navigate("/lists");
  };
  const onInvitationCode = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("invite_code");

    if (inviteCode) {
      $post("users/invitation_code", { code: inviteCode })
        .then((response) => {
          console.log("users/invitation_code", response);
        })
        .catch((error) => {
          console.error("Error initializing user:", error);
        });
    }
  };
  const getUserPoints = async () => {
    const response = await $get("users/points");
    console.log("users/points", response);
  };
  const onOpenTMA = async () => {
    $post("operation_logs", {
      source: "NEW_RECOMMENDED",
      target: "MINI_APP",
      target_id: "1",
      operation: "OPEN_MINI_APP",
    })
      .then((response) => {
        console.log("operation_logs", response);
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
        setHotCate(hostCateRes.data.list[0].apps);
        setName(hostCateRes.data.list[0].category.name);
        await onInvitationCode();
        await getUserPoints();
        await onOpenTMA();
      }
    })();
  }, []);
  const onCategories = async (name) => {
    navigate("/lists", { state: { name: name } });
  };
  const onOpen = async (bot) => {
    console.log("WebApp", window.Telegram.WebApp);
    window.Telegram.WebApp.openTelegramLink(bot);
  };
  const goTask = async () => {
    navigate("/task");
  };
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* <div className="flex p-20 w-full ">
        <div className="bg-gray-200 w-full h-38 rounded-xl flex flex-row items-center px-20">
          <span>搜索</span>
        </div>
      </div> */}
      <div className="flex flex-row overflow-x-scroll pl-5 w-full my-10 mt-20">
        {/* categories */}
        {categorieList.length > 0 &&
          categorieList.map((item, i) => {
            return (
              <div
                key={i}
                className="py-4 h-36 flex-shrink-0 whitespace-nowrap  px-20 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center"
                onClick={() => {
                  onCategories(item.id);
                }}
              >
                <img className="mr-5 w-16 h-16 rounded-xl" src={item.logo_url} alt="" />
                <span className="text-14">{item.name}</span>
              </div>
            );
          })}
      </div>
      {/* <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-18">最近打开</h1>
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
        className="flex justify-between flex-row p-20 items-center "
      >
        打开积分
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-20">New</h1>
          <span
            className="text-14 text-sky-600"
            onClick={() => {
              onCategories("new");
            }}
          >
            查看全部
          </span>
        </div>
        <div className="flex flex-col px-20">
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

      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-20">Hot</h1>
          <span
            className="text-14 text-sky-600"
            onClick={() => {
              onCategories("hot");
            }}
          >
            查看全部
          </span>
        </div>
        <div className="flex flex-col px-20">
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

      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-20 items-center ">
          <h1 className="text-20">{cateName ? cateName : ""}</h1>
        </div>
        <div className="flex flex-col px-20">
          {hotCate.length > 0 &&
            hotCate.map((item, i) => {
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
    </div>
  );
};

export default Home;
