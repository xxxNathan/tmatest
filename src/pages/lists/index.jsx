import { useState, useEffect } from "react";
import { $get, $post } from "@/api/axios";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Lists = () => {
  const [list, setList] = useState(null);
  const [cursor, setCursor] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const location = useLocation();
  const { name, value } = location.state || {};
  useEffect(() => {
    (async () => {
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
          resList = await $get(`/mini_apps?keyword=${value}&limit=10&from=${cursor}`);
          setCursor(resList?.data?.cursor);
          setHasMore(resList?.data?.has_more);
          break;
        case "id":
          resList = await $get(`/mini_apps/category?category_id=${value}&limit=10&from=${cursor}`);
          setCursor(resList?.data?.cursor);
          setHasMore(resList?.data?.has_more);
          break;
        default:
          console.log(`Unknown name: ${name}`);
      }
      setList(resList.data.list);
    })();
  }, [name]);

  const loadMoreData = async () => {
    console.log("loadMoreData");
    if (!hasMore) return false;
    if (name == "id") {
      let resList = await $get(`/mini_apps/category?category_id=${value}&limit=10&from=${cursor}`);
      setList((prevList) => [...prevList, ...resList.data.list]);
      setCursor(resList?.data?.cursor);
      setHasMore(resList?.data?.has_more);
    } else if (name == "search") {
      let resList = await $get(`/mini_apps?keyword=${value}&limit=10&from=${list[list.length - 1].id}`);
      setCursor(resList?.data?.cursor);
      setList((prevList) => [...prevList, ...resList.data.list]);
      setHasMore(resList?.data?.has_more);
    }

    // const newData = await fetchData();
    // if (newData.length === 0) {
    //   setHasMore(false);
    // } else {
    //   setList((prevList) => [...prevList, ...newData]);
    // }
  };

  // useEffect(() => {
  //   (async () => {
  //     const initialData = await fetchData();
  //     setList(initialData);
  //   })();
  // }, [name, value, cursor]);

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
        <InfiniteScroll
          dataLength={list && list.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={hasMore && <h4 style={{ textAlign: "center", margin: "40px 0" }}>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center" }}></p>}
        >
          {list &&
            list.length > 0 &&
            list.map((item, i) => (
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
            ))}
          {list && list.length === 0 && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">No Data</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Lists;
