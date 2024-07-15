// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import iconFav from "@/assets/images/icon-fav.png";
const Home = () => {
  // const [userInfo, setUserInfo] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // Category;
  useEffect(() => {
    console.log("token");
    const token = localStorage.getItem("token") || false;
    if (token) {
      const response = $get("categories");
      console.log("v1/categories", response);
    }
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-5 items-center mt-2">
          <h1 className="text-4xl">New</h1>
          {/* <span className="text-2xl text-sky-600">查看全部</span> */}
        </div>
        <div className="flex flex-col px-5">
          <div className="flex items-center">
            <img className="w-24 h-24 mr-4" src={iconFav} alt="" />

            <div className="flex-1 overflow-hidden">
              <h3 className="text-xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Title</h3>
              <span className="w-16 h-16 bg-sky-600 text-white text-lg py-1 px-2 rounded-lg">新</span>
              <p className="text-lg text-gray-600 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
                DescriptionDescriptionDescriptionDescriptionDescription
              </p>
            </div>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white text-xl rounded-full">打开</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
