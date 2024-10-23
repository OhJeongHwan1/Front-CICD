import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const navigate = useNavigate();

export const login = async (data) => {
  await axiosInstance.post("user/login", data).then((res) => {
    if (res.status === 200) {
      if (res.data.msg) {
        alert("로그인 성공");
        navigate(`/`);
      } else {
        alert("로그인 실패");
      }
    } else {
      alert("비정상 응답");
    }
  });
};
