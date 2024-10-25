import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EachCommentComp from "./EachCommentComp";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

function MyCommentComp({ user, onTotalChange }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      profile: "/Default Profile4.png",
      nickname: "한성용",
      title: "오사카 3일차 [도톤보리]",
      comment:
        "오사카 저도 가고 싶어요!! ㅠㅠ 이번 겨울에 가려는데 어디가 제일 좋았어요?",
    },
    {
      id: 2,
      profile: "/Default Profile3.png",
      nickname: "대상연",
      title: "중국 먹거리 여행기",
      comment: "교토 어디가 재밌어요?",
    },
    {
      id: 3,
      profile: user.profile,
      nickname: user.nickName,
      title: "일본 여행 준비물",
      comment: "네 다음에 꼭 한번 가보세여 ㅎㅎ",
    },
    {
      id: 4,
      profile: "/Default Profile.png",
      nickname: "hanyong5",
      title: "터키 여행기",
      comment: "풍경이 미쳤네요 ㄷㄷㄷㄷ",
    },
    {
      id: 5,
      profile: user.profile,
      nickname: user.nickName,
      title: "일본 여행 준비물",
      comment: "챙겨가시면 좋아요!",
    },
    {
      id: 6,
      profile: "/Default Profile6.png",
      nickname: "정한얼",
      title: "여름이었다.",
      comment: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 잘 보고 가요~",
    },
  ]);

  useEffect(() => {
    onTotalChange(comments.length);
  }, [comments.length, onTotalChange]);

  const handleDelete = (id) => {
    if (window.confirm("정말로 삭제할까요?")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  return (
    <CommentsContainer>
      {/* {comments.map((comment) => (
        <EachCommentComp
          key={comment.id}
          profile={comment.profile}
          nickname={comment.nickname}
          title={comment.title}
          comment={comment.comment}
          onDelete={() => handleDelete(comment.id)}
        />
      ))} */}
    </CommentsContainer>
  );
}

export default MyCommentComp;
