import axios from "axios";
import { setUser } from "../redux/userSlice";

const BASE_URL = "http://haneol-test.kro.kr";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // 로그인
  login: (data) => axiosInstance.post("/api/user/login", data),
  resignation: () => {
    const token = localStorage.getItem("token");
    return axiosInstance.post(
      "/api/user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // 포스팅
  getPostingList: (data) =>
    axiosInstance.get(
      `api/posting/search?nationCode=${
        data.nationCode === undefined ? null : data.nationCode
      }&cityCode=${
        data.cityCode === undefined ? null : data.cityCode
      }&writerNickname=${
        data.writerNickname === undefined ? null : data.writerNickname
      }&title=${data.title === undefined ? null : data.title}&page=${
        data.page === undefined ? 1 : data.page
      }`
    ),

  // 내 정보 보기

  getMySpaceList: (data) => axiosInstance.get(`api/space/my`),

  // 스페이스
  postSpace: (data) => axiosInstance.post(`api/space`, data),

  editSpace: (data) => axiosInstance.put(`api/space/${data.spaceId}`, data),

  getSpaceDetail: (id) => axiosInstance.get(`api/space/${id}`),

  getSpacePostingList: (id) => axiosInstance.get(`api/posting/space/${id}`),

  getSpaceScheduleList: (id) =>
    axiosInstance.get(`api/schedule/${id}/schedules`),

  addMembers: (data) => axiosInstance.post(`api/space/member`, data),

  deleteMember: (data) =>
    axiosInstance.delete(`api/space/member`, { data: data }),

  addSchedule: (data) => axiosInstance.post(`api/schedule`, data),

  deleteSchedule: (id) => axiosInstance.delete(`api/schedule/${id}`),

  // 포스팅

  getPostingDetail: (id) => axiosInstance.get(`api/posting/${id}`),

  addPosting: (data) => axiosInstance.post(`api/posting`, data),

  deletePosting: (id) => axiosInstance.delete(`api/posting/${id}`),
};

// 회원가입
export const sendEmailCode = async (email) => {
  try {
    const res = await axiosInstance.post(
      `api/user/send-email-code?sendTo=${encodeURIComponent(email)}`
    );

    if (res.status === 200) {
      console.log("Email sent to server successfully.");
    } else {
      console.error("Failed to send email to server.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const verifyEmailCode = async (inputNum) => {
  try {
    const res = await axiosInstance.post(
      `api/user/check-email-code?inputNum=${encodeURIComponent(inputNum)}`
    );

    if (res.status === 200) {
      console.log("Email verification SUCCESS.");
      return true;
    } else {
      console.error("Email verification FAILED.");
      return false;
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    return false;
  }
};

export const signUp = async (email, password, nickname) => {
  try {
    const data = {
      email: email,
      password: password,
      nickName: nickname,
    };

    const res = await axiosInstance.post(
      "api/user/signup",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 201) {
      console.log("Signup SUCCESS.");
      return true;
    } else {
      console.error("Signup FAILED.");
      return false;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return false;
  }
};

// 로그인
// export const login = async (email, password) => {
//   try {
//     const data = { email, password };

//     const res = await axiosInstance.post("/api/user/login", data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const token = res.headers.authorization;

//     if (token) {
//       localStorage.setItem("token", token.slice(7));
//       return true;
//     } else {
//       console.error("Token is undefined.");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return false;
//   }
// };

// 로그아웃
// const logout = () => {
//   // localStorage에서 토큰을 삭제
//   localStorage.removeItem("token");

//   navigate("/");
// };

// 회원 탈퇴
// export const resignation = async (accessToken) => {
//   const navigate = useNavigate();

//   try {
//     const res = await axiosInstance.delete("api/user", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     navigate("/");
//   } catch (error) {
//     console.error("Error during resignation:", error);
//     throw error;
//   }
// };
