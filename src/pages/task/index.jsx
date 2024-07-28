// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { $get } from "@/api/axios";
import IconPoints from "@/assets/images/icon_points.png";
import IconSuccess from "@/assets/images/icon_success.png";
import TaskIcon1 from "@/assets/images/task_icon1.png";
import TaskIcon2 from "@/assets/images/task_icon2.png";
import TaskIcon3 from "@/assets/images/task_icon3.png";
import TaskIcon4 from "@/assets/images/task_icon4.png";
import TaskIcon5 from "@/assets/images/task_icon5.png";
import TaskIcon6 from "@/assets/images/task_icon6.png";
import TaskIcon7 from "@/assets/images/task_icon7.png";
import useTelegram from "@/hooks/useTelegram";
const Task = () => {
  const { isTma, initData } = useTelegram();
  const [inviteCode, setInviteCode] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  const [showInitData, setInitData] = useState(null);
  const taskIcons = [TaskIcon1, TaskIcon2, TaskIcon3, TaskIcon4, TaskIcon5, TaskIcon6, TaskIcon7];
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
      setInviteCode(getInvitation?.data?.code);
      const getTask = await $get("users/task_details");
      console.log("users/task_details", getTask.data.list);
      await setTaskList(getTask.data.list);
      const getPoints = await $get("users/points");
      setUserPoints(getPoints?.data?.points);
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
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(" ")}`;
    window.Telegram.WebApp.openTelegramLink(shareUrl);
  };
  const onTask = async (item) => {
    console.log("onTask", item);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col mt-40">
        <div className="flex flex-col ">
          <div className="flex items-center px-20">
            <img className="w-60 h-60 mr-10 rounded-2xl" src={IconPoints} alt="" />

            <div>
              <h1 className="text-20">
                {showInitData && showInitData?.user?.first_name + showInitData?.user?.last_name}
              </h1>
              <div className="text-14 mt-2">
                <span>Total Points: </span>
                <span>{userPoints}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-20 bg-white rounded-t-xl px-20">
            <div
              className="border-1  border-b  h-70 flex flex-row justify-between items-center text-16  "
              onClick={() => {
                onShare();
              }}
            >
              <div className="flex flex-row items-center jusity-center">
                <img className="w-28 h-28 bg-pGrey rounded-full bg-white" src={TaskIcon1} alt="" />
                <span className=" ml-10 text-black text-14 ">Referral link</span>
              </div>
              {/* <img className="w-20 h-20" src={IconSuccess} alt="Search Icon" /> */}
              <div className="text-gray-400">&gt;</div>
            </div>
            {taskList &&
              taskList.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="border-1 border-b  h-70 flex flex-row justify-between items-center text-16  "
                    onClick={() => {
                      onTask(item);
                    }}
                  >
                    <div className="flex flex-row items-center jusity-center">
                      <img
                        className="w-28 h-28 bg-pGrey rounded-full bg-white"
                        src={taskIcons[1 + (i % taskIcons.length)]}
                        alt=""
                      />
                      <span className=" ml-10 text-black text-14 ">{item.task.name}</span>
                    </div>
                    {item.completed ? (
                      <img className="w-20 h-20" src={IconSuccess} alt="Search Icon" />
                    ) : (
                      <div className="text-gray-400">
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
