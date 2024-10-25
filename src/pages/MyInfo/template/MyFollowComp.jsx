import React, { useEffect } from "react";
import styled from "styled-components";
import EachFollowComp from "./EachFollowComp";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const dummyData = [
  {
    nickname: "여행하는 호랑이",
    email: "tiger_travel@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=tiger`,
    introduction: "세계 곳곳을 여행하며 맛집 탐방중! 🌏✈️",
  },
  {
    nickname: "맛집탐험가",
    email: "food_explorer@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=food`,
    introduction: "전국 방방곡곡 맛집 리뷰어 🍜",
  },
  {
    nickname: "포토그래퍼민지",
    email: "photo_minji@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=minji`,
    introduction: "일상을 담는 카메라 📸",
  },
  {
    nickname: "산책러버",
    email: "walking_lover@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=walk`,
    introduction: "도시 산책과 카페 투어 🚶‍♂️☕",
  },
  {
    nickname: "책읽는공선생",
    email: "book_teacher@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=book`,
    introduction: "독서와 글쓰기를 좋아하는 교사 📚",
  },
  {
    nickname: "디저트킹",
    email: "dessert_king@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=dessert`,
    introduction: "달콤한 디저트 리뷰어 🍰",
  },
  {
    nickname: "캠핑러버",
    email: "camping_lover@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=camping`,
    introduction: "주말마다 떠나는 캠핑 여행 ⛺",
  },
  {
    nickname: "플랜트마스터",
    email: "plant_master@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=plant`,
    introduction: "집을 정글로 만드는 중 🌿",
  },
  {
    nickname: "고양이집사",
    email: "cat_butler@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=cat`,
    introduction: "세 냥이의 집사입니다 😺",
  },
  {
    nickname: "피트니스왕",
    email: "fitness_king@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=fitness`,
    introduction: "건강한 라이프스타일 추구 💪",
  },
  {
    nickname: "영화평론가",
    email: "movie_critic@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=movie`,
    introduction: "주말마다 영화 리뷰 작성 중 🎬",
  },
  {
    nickname: "커피애호가",
    email: "coffee_lover@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=coffee`,
    introduction: "커피와 함께하는 아침 ☕",
  },
  {
    nickname: "뮤지션준호",
    email: "musician_junho@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=music`,
    introduction: "음악이 있는 일상 🎸",
  },
  {
    nickname: "요리하는개발자",
    email: "cooking_dev@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=cook`,
    introduction: "코딩하다 요리하는 개발자 👨‍💻🍳",
  },
  {
    nickname: "그림쟁이",
    email: "artist_kim@example.com",
    profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=art`,
    introduction: "취미로 그림 그리는 중 🎨",
  },
];

function MyFollowComp({ onTotalChange }) {
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(dummyData.length);
    }
  }, [dummyData.length, onTotalChange]);

  return (
    <Container>
      {dummyData.map((user) => (
        <EachFollowComp
          key={user.email}
          nickname={user.nickname}
          email={user.email}
          profile={user.profile}
          introduction={user.introduction}
        />
      ))}
    </Container>
  );
}

export default MyFollowComp;
