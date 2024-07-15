// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Lists from "@/pages/lists";
import Task from "@/pages/task";

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/task" element={<Task />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  </>
);

export default AppRoutes;
