import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  selectedSpaceId: 0,
  spaceList: [],
  spaceDetail: {
    spaceId: 0,
    leaderId: 0,
    spaceName: "새로운 여행 1",
    description: " 정말 재밌어요",
    members: [
      {
        userId: 0,
        profile: null,
        nickname: "안녕내이름은머머머머머야",
        email: "dhwjdghks@naver.com",
      },
      {
        userId: 1,
        profile: null,
        nickname: "정한얼",
        email: "sadgadhsjad@gmail.com",
      },
      {
        userId: 12,
        profile: null,
        nickname: "전우정",
        email: "rifghskj@daum.net",
      },
      {
        userId: 2,
        profile: null,
        nickname: "이주희",
        email: "ssagdhsaudhsadkj@daum.net",
      },
      {
        userId: 3,
        profile: null,
        nickname: "이윤주",
        email: "12hjr71h2@daum.net",
      },
    ],
    maxMembers: 7,
    nationCode: "kr",
    cityCode: "seoul",
    startDate: "2024-10-24",
    endDate: "2024-10-25",
  },
  scheduleList: [
    {
      scheduleId: 78,
      spaceId: 0,
      spot: "이태원",
      memo: "최고의 맛집",
      day: 24,
    },
    {
      scheduleId: 65,
      spaceId: 2,
      spot: "살았다",
      memo: "최고의 맛집",
      day: 24,
    },
    {
      scheduleId: 12,
      spaceId: 3,
      spot: "다행이야",
      memo: "최고의 맛집",
      day: 25,
    },
    {
      scheduleId: 45,
      spaceId: 3,
      spot: "건대 입구",
      memo: "최고의 맛집",
      day: 26,
    },
  ],
  postingList: [
    {
      postingId: 12,
      wirterNickname: "오정환",
      title: "1일차 여행",
      content:
        "코타키나발루에서의 첫 날을 보내며 멋진 해변과 맛있는 음식을 즐겼어요!",
      accessLevel: "PUBLIC",
      mainImgUrl: "https://picsum.photos/300/300/?image=100", // Updated image URL
      scheduleId: 0,
      spaceId: 0,
      createdAt: "2024-10-23",
      modifedAt: "2024-10-25",
      commentCnt: 4,
    },
    {
      postingId: 13,
      wirterNickname: "김민지",
      title: "2일차의 모험",
      content: "바다로 다이빙을 하며 흥미진진한 수중 경험을 했습니다!",
      accessLevel: "PRIVATE",
      mainImgUrl: "https://picsum.photos/300/300/?image=101", // Updated image URL
      scheduleId: 1,
      spaceId: 1,
      createdAt: "2024-10-24",
      modifedAt: "2024-10-26",
      commentCnt: 2,
    },
    {
      postingId: 14,
      wirterNickname: "이수영",
      title: "발리에서의 일상",
      content: "발리의 아름다운 해변에서 서핑을 즐기며 휴식을 취했습니다.",
      accessLevel: "PUBLIC",
      mainImgUrl: "https://picsum.photos/300/300/?image=102", // Updated image URL
      scheduleId: 2,
      spaceId: 2,
      createdAt: "2024-10-25",
      modifedAt: "2024-10-27",
      commentCnt: 5,
    },
    {
      postingId: 15,
      wirterNickname: "박준호",
      title: "해변에서의 저녁",
      content: "해변에서 바라보는 석양과 함께한 저녁 식사가 인상적이었습니다.",
      accessLevel: "FRIENDS",
      mainImgUrl: "https://picsum.photos/300/300/?image=103", // Updated image URL
      scheduleId: 3,
      spaceId: 3,
      createdAt: "2024-10-26",
      modifedAt: "2024-10-28",
      commentCnt: 3,
    },
    {
      postingId: 16,
      wirterNickname: "정태영",
      title: "야간 시장 탐방",
      content: "현지 야간 시장을 방문해 다양한 먹거리와 기념품을 구매했습니다.",
      accessLevel: "PUBLIC",
      mainImgUrl: "https://picsum.photos/300/300/?image=104", // Updated image URL
      scheduleId: 4,
      spaceId: 4,
      createdAt: "2024-10-27",
      modifedAt: "2024-10-29",
      commentCnt: 7,
    },
    {
      postingId: 17,
      wirterNickname: "최영희",
      title: "힐링의 시간",
      content:
        "자연 속에서 힐링하며 산책을 즐겼습니다. 숲 속의 신선한 공기가 최고였어요.",
      accessLevel: "PUBLIC",
      mainImgUrl: "https://picsum.photos/300/300/?image=108", // Updated image URL
      scheduleId: 5,
      spaceId: 5,
      createdAt: "2024-10-28",
      modifedAt: "2024-10-30",
      commentCnt: 8,
    },
    {
      postingId: 18,
      wirterNickname: "황지민",
      title: "문화 유산 탐방",
      content: "역사적인 문화 유산을 방문하며 많은 것을 배울 수 있었습니다.",
      accessLevel: "PUBLIC",
      mainImgUrl: "https://picsum.photos/300/300/?image=106", // Updated image URL
      scheduleId: 6,
      spaceId: 6,
      createdAt: "2024-10-29",
      modifedAt: "2024-10-31",
      commentCnt: 6,
    },
  ],
  //
};

export const getSpaceDetailAsync = createAsyncThunk(
  "space/getSpaceDetail",
  async (data) => {
    const response = await api.getSpaceDetail(data);

    return response.data;
  }
);

export const getSpacePostingListAsync = createAsyncThunk(
  "space/getSpacePostingList",
  async (data) => {
    const response = await api.getSpacePostingList(data);

    return response.data;
  }
);

export const getSpaceScheduleListAsync = createAsyncThunk(
  "space/getSpaceScheduleList",
  async (data) => {
    const response = await api.getSpaceScheduleList(data);

    return response.data;
  }
);

export const postSpaceAsync = createAsyncThunk(
  "space/postSpace",
  async (data) => {
    const response = await api.postSpace(data);
    const { result } = response.data;

    return response.data;
  }
);

export const editSpaceAsync = createAsyncThunk(
  "space/editSpace",
  async (data) => {
    const response = await api.editSpace(data);
    const { result } = response.data;

    return result;
  }
);

export const addMembersAsync = createAsyncThunk(
  "space/addMembers",
  async (data) => {
    const response = await api.addMembers(data);
    const { result } = response.data;

    return result;
  }
);

export const deleteMemberAsync = createAsyncThunk(
  "space/deleteMember",
  async (data) => {
    const response = await api.deleteMember(data);
    const { result } = response.data;

    return result;
  }
);

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSelectedSpaceId: (state, action) => {
      state.selectedSpaceId = action.payload;
    },
    setSpaceDetail: (state, action) => {
      state.spaceDetail = action.payload;
    },
    setPostingList: (state, action) => {
      state.postingList = action.payload;
    },
    setScheduleList: (state, action) => {
      state.scheduleList = action.payload;
    },
  },
});

export const {
  setSelectedSpaceId,
  setSpaceDetail,
  setPostingList,
  setScheduleList,
} = spaceSlice.actions;

export const selectSpace = (state) => state.space;

export default spaceSlice.reducer;
