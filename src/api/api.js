import axios from "axios";

const BASE_URL = "http://haneol-test.kro.kr ";

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
  getPostingList: (data) =>
    axiosInstance.get(
      `api/posting/search?nationCode=${data.nationCode}&cityCode=${data.cityCode}&writerNickname=${data.writerNickname}&title=${data.title}`
    ),
};

// 회원가입 API
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

// 로그인 API
export const login = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };

    const res = await axiosInstance.post(
      "api/user/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      // 헤더에서 토큰을 추출해서 localStorage에 저장한다.
      const token = res.headers["authorization"];

      localStorage.setItem("token", token);
      console.log("Login SUCCESS.");
      return true;
    } else {
      console.error("Login FAILED.");
      return false;
    }
  } catch (error) {
    console.error("Erro during login:", error);
    return false;
  }
};

export const getMyPostings = async () => {
  const response = await fetch("/api/my-postings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};
