// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import searchIcon from "@/assets/images/search-icon.png";
import iconFav from "@/assets/images/icon-fav.png";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // Category;
  const handleButtonClick = () => {
    navigate("/lists");
  };
  useEffect(() => {
    console.log("token");
    const token = localStorage.getItem("token") || false;
    if (token) {
      const response = $get("categories");
      console.log("v1/categories---------------", response);
    }
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="flex  p-5 w-full ">
        <div className="bg-gray-200 w-full h-16 rounded-xl flex flex-row items-center px-5">
          <img className="mr-4" src={searchIcon} alt="Search Icon" />
          <span>搜索</span>
        </div>
      </div>
      <div className="flex flex-row overflow-x-scroll pl-5 w-full my-2">
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>The Open Lasd</span>
        </div>
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>推荐1</span>
        </div>
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>推荐1</span>
        </div>
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>推荐1</span>
        </div>
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>推荐1</span>
        </div>
        <div className="py-2 flex-shrink-0 whitespace-nowrap  px-4 shadow-inner border-1 border-gray-100 bg-white rounded-xl mr-4 flex flex-row items-center">
          <img className="mr-2" src={iconFav} alt="" />
          <span>推荐1</span>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-5 items-center mt-2">
          <h1 className="text-4xl">New</h1>
          <span className="text-2xl text-sky-600" onClick={handleButtonClick}>
            查看全部
          </span>
        </div>
        <div className="flex flex-row overflow-x-scroll pl-5 w-full py-5">
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img1} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full">
              namenamenamename
            </span>
          </div>
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img2} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full text-center">
              aaa
            </span>
          </div>
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img3} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full text-center">
              aaa
            </span>
          </div>
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img1} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full text-center">
              aaa
            </span>
          </div>
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img2} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full text-center">
              aaa
            </span>
          </div>
          <div className="flex flex-col mr-8 items-center justify-center w-28 flex-shrink-0">
            <img className="w-28 h-28 rounded-xl" src={img3} alt="" />
            <span className="text-2xl mt-2 text-ellipsis overflow-hidden w-full text-center">
              aaa
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between flex-row p-5 items-center mt-2">
          <h1 className="text-4xl">New</h1>
          <span className="text-2xl text-sky-600">查看全部</span>
        </div>
        <div className="flex flex-col px-5">
          <div className="flex items-center">
            <img className="w-24 h-24 mr-4 rounded-xl" src={img1} alt="" />

            <div className="flex-1 overflow-hidden">
              <h3 className="text-3xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                Title
              </h3>

              <p className="text-xl text-gray-600 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
                DescriptionDescriptionDescriptionDescriptionDescription
              </p>
            </div>
            <button className="ml-4 px-8 py-4 bg-blue-500 text-white text-2xl rounded-2xl">
              打开
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
