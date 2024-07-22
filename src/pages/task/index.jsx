// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import IconPoints from "@/assets/images/icon_points.png";
import IconSuccess from "@/assets/images/icon_success.png";
import useTelegram from "@/hooks/useTelegram";
const Task = () => {
  const { isTma, initData } = useTelegram();
  const [inviteCode, setInviteCode] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  const [showInitData, setInitData] = useState(null);
  useEffect(() => {
    console.log("isTma", isTma, initData);
    if (isTma && initData) {
      console.log("initData", parseInitData(initData));
      setInitData(parseInitData(initData));
    }
  }, [isTma, initData]);
  useEffect(() => {
    (async () => {
      const getInvitation = await $get("users/invitation_info");
      console.log("getInvitation", getInvitation?.data?.code);
      setUserPoints(getInvitation?.data?.points);
      setInviteCode(getInvitation?.data?.code);
      const getTask = await $get("users/task_details");
      console.log("users/task_details", getTask.data.list);
      await setTaskList(getTask.data.list);
    })();
  }, []);
  const parseInitData = (data) => {
    const params = new URLSearchParams(data);
    const initDataObj = {};
    for (const [key, value] of params.entries()) {
      try {
        initDataObj[key] = JSON.parse(value);
      } catch (e) {
        initDataObj[key] = value;
      }
    }
    return initDataObj;
  };
  const onShare = async () => {
    const url = `t.me/ACenterMainer_bot/ACenterMainer?startapp=${inviteCode}`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(" ")}`;
    window.Telegram.WebApp.openTelegramLink(shareUrl);
  };
  const onTask = async (item) => {
    console.log("onTask", item);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col mt-20">
        <div className="flex flex-col px-10">
          <div className="flex items-center">
            <img
              className="w-60 h-60 mr-10 rounded-2xl"
              src={IconPoints}
              alt=""
            />

            <div>
              <h1 className="text-20">
                {showInitData &&
                  showInitData?.user?.first_name +
                    showInitData?.user?.last_name}
              </h1>
              <div className="text-14 mt-2">
                <span>Total Points: </span>
                <span>{userPoints}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-20">
            <div
              className="bg-gray-200 px-20 h-52 flex flex-row justify-between items-center text-16 mb-20 rounded-xl"
              onClick={() => {
                onShare();
              }}
            >
              <div className="flex flex-row items-center jusity-center">
                <div className="w-24 h-24 bg-pGrey rounded-full bg-white"></div>
                <span className=" ml-10 text-black text-14 ">
                  Referral link
                </span>
              </div>
              <img className="w-20 h-20" src={IconSuccess} alt="Search Icon" />
            </div>
            {taskList &&
              taskList.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-gray-200 px-20 h-52 flex flex-row justify-between items-center text-16 mb-20 rounded-xl"
                    onClick={() => {
                      onTask(item);
                    }}
                  >
                    <div className="flex flex-row items-center jusity-center">
                      <div className="w-24 h-24 bg-pGrey rounded-full bg-white"></div>
                      <span className=" ml-10 text-black text-14 ">
                        {item.task.source}
                      </span>
                    </div>
                    {item.completed ? (
                      <img
                        className="w-20 h-20"
                        src={IconSuccess}
                        alt="Search Icon"
                      />
                    ) : (
                      <div className="text-gray-500">
                        {item.times} / {item.task.threshold} &gt;
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
