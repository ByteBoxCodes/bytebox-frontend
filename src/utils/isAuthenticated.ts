import { useNavigate } from "react-router-dom";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
