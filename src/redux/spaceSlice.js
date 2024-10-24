import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      },
      {
        userId: 1,
        profile: null,
        nickname: "2",
      },
      {
        userId: 1,
        profile: null,
        nickname: "3",
      },
      {
        userId: 2,
        profile: null,
        nickname: "3",
      },
      {
        userId: 3,
        profile: null,
        nickname: "3",
      },
    ],
    maxMembers: 7,
    nationCode: "kr",
    cityCode: "seoul",
    startDate: new Date(),
    endDate: new Date(),
    scheduleList: [
      {
        scheduleId: 0,
        spaceId: 0,
        spot: "이태원",
        memo: "최고의 맛집",
        day: 24,
      },
      {
        scheduleId: 0,
        spaceId: 0,
        spot: "살았다",
        memo: "최고의 맛집",
        day: 24,
      },
      {
        scheduleId: 0,
        spaceId: 0,
        spot: "다행이야",
        memo: "최고의 맛집",
        day: 25,
      },
      {
        scheduleId: 0,
        spaceId: 0,
        spot: "건대 입구",
        memo: "최고의 맛집",
        day: 26,
      },
    ],
    postingList: [],
  },
  //
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
});

export const {} = spaceSlice.actions;

export const selectSpace = (state) => state.space;

export default spaceSlice.reducer;
