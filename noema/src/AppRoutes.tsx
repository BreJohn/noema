import { Routes, Route, Navigate } from "react-router-dom";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/requests" replace />} />
    <Route path="/requests" element={<Requests />} />
    <Route path="/create" element={<CreateRequest />} />
  </Routes>
);

export default AppRoutes;
