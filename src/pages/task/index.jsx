// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import iconFav from "@/assets/images/icon-fav.png";
const Home = () => {
  // const [userInfo, setUserInfo] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // Category;
  useEffect(() => {
    console.log("Task");
    // const token = localStorage.getItem("token") || false;
    // if (token) {
    //   const response = $get("categories");
    //   console.log("v1/categories", response);
    // }
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="flex flex-col ">
        <div className="flex flex-col px-5">
          <div className="flex items-center">
            <img className="w-32 h-32 mr-4 rounded-2xl" src={iconFav} alt="" />

            <div>
              <h1 className="text-4xl">Total Points</h1>
              <div className="text-2xl mt-2">
                <span>Recommended link: </span>
                <span className="text-blue">1232</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <div className="bg-bGrey px-6 py-4 flex flex-row justify-between items-center text-3xl">
              <div className="flex flex-row items-center jusity-center">
                <div className="w-16 h-16 bg-pGrey rounded-full"></div>
                <span className=" ml-4 text-black">New Recommend</span>
              </div>
              <div>0/3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
