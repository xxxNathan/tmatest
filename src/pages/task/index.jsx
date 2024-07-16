// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import IconPoints from "@/assets/images/icon_points.png";
import IconSuccess from "@/assets/images/icon_success.png";
const Home = () => {
  useEffect(() => {
    (async () => {
      const response = await $get("users/task_details");
      console.log("users/task_details", response.data);
      console.log("users/task_details", response.data.list);
    })();
  }, []);

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col mt-20">
        <div className="flex flex-col px-10">
          <div className="flex items-center">
            <img className="w-60 h-60 mr-10 rounded-2xl" src={IconPoints} alt="" />

            <div>
              <h1 className="text-20">Total Points</h1>
              <div className="text-14 mt-2">
                <span>Recommended link: </span>
                <span className="text-blue-500">1232</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-20">
            <div className="bg-gray-200 px-20 h-52 flex flex-row justify-between items-center text-16 mb-20 rounded-xl">
              <div className="flex flex-row items-center jusity-center">
                <div className="w-24 h-24 bg-pGrey rounded-full bg-white"></div>
                <span className=" ml-10 text-black ">New Recommend</span>
              </div>
              <div className="text-gray-500">0/3 ></div>
            </div>
            <div className="bg-gray-200 px-20 h-52 flex flex-row justify-between items-center text-16 mb-20 rounded-xl">
              <div className="flex flex-row items-center jusity-center">
                <div className="w-24 h-24 bg-pGrey rounded-full bg-white"></div>
                <span className=" ml-10 text-black ">New Recommend</span>
              </div>
              <img className="w-20 h-20" src={IconSuccess} alt="Search Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
