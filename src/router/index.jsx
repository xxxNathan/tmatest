// AppRoutes.js
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "@/pages/home";
import Lists from "@/pages/lists";
import Task from "@/pages/task";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateBackButton = () => {
      const currentPath = location.pathname;

      if (currentPath === "/home") {
        window.Telegram.WebApp.BackButton.hide();
      } else {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
          navigate(-1);
        });
      }
    };

    updateBackButton();
    window.addEventListener("popstate", updateBackButton);

    return () => {
      window.removeEventListener("popstate", updateBackButton);
    };
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/lists" element={<Lists />} />
      <Route path="/task" element={<Task />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
