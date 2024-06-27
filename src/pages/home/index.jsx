// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
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
      <div className="flex  p-5 w-full ">
        <div className="bg-gray-200 w-full h-16 rounded-xl flex flex-row items-center px-5">
          <img src="@/assets/search.svg" alt="" />
          <span>搜索</span>
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll pl-5 w-full ">
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐1
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐2
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐3
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐4
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐5
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐6
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐7
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐8
        </div>
        <div className="py-2 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4">
          推荐9
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-5">
          <h1>New</h1>
          <span>查看全部</span>
        </div>
        <div className="flex flex-row overflow-x-scroll pl-5 w-full my-5">
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
          <div className="flex flex-col mr-5">
            IMAGE
            <span>name</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-5">
          <h1>New</h1>
          <span>查看全部</span>
        </div>
        <div className="flex flex-col px-5">
          <div className="flex items-center">
            <img src="image_url" alt="image" className="w-16 h-16 mr-4" />
            <div className="flex-1 overflow-hidden">
              <h3 className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">Title</h3>
              <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">Description</p>
            </div>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-3xl">打开</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
