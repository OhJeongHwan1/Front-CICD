import React from "react";
import styled from "styled-components";
import PostingCard from "../../../components/PostingCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
`;

const generateDummyPosts = (count) => {
  const dummyTexts = [
    "여행은 새로운 경험과 추억을 만드는 특별한 시간입니다. 이번 여행에서 만난 사람들과 장소들은 정말 인상적이었죠.",
    "맛집 탐방은 언제나 즐거운 일입니다. 오늘 발견한 숨은 맛집을 여러분과 공유하고 싶어요.",
    "일상의 작은 순간들이 모여 우리의 삶을 만듭니다. 오늘도 특별한 하루를 보냈네요.",
    "새로운 취미를 시작하는 것은 언제나 설렙니다. 이번에 시작한 취미 생활을 소개합니다.",
    "책 읽기의 즐거움을 아는 사람이라면 공감하실 거예요. 이번에 읽은 책을 추천합니다.",
  ];

  const titles = [
    "특별한 여행 이야기",
    "오늘의 맛집 탐방",
    "일상의 순간들",
    "새로운 취미 생활",
    "이번 달의 추천 도서",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: titles[index % 5] + ` #${Math.floor(index / 5) + 1}`,
    mainImg: "https://i.imgur.com/0TIs0vO.png",
    content: dummyTexts[index % 5],
    commentsCount: Math.floor(Math.random() * 50),
    createAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    profileImg: `/api/placeholder/40/40`,
    nickname: `사용자${index + 1}`,
  }));
};

function MyPostingComp() {
  // 20개의 더미 데이터 생성
  const dummyPosts = generateDummyPosts(20);

  return (
    <Container>
      {dummyPosts.map((post) => (
        <PostingCard
          key={post.id}
          width="100%"
          title={post.title}
          mainImg={post.mainImg}
          content={post.content}
          commentsCount={post.commentsCount}
          createAt={post.createAt}
          isMine={true}
          profileImg={post.profileImg}
          nickname={post.nickname}
          onClick={() => {
            console.log(`Clicked post ${post.id}`);
          }}
        />
      ))}
    </Container>
  );
}

export default MyPostingComp;
