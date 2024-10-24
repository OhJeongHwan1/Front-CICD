import React from "react";
import styled from "styled-components";
import EachCommentComp from "./EachCommentComp";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

function MyCommentComp() {
  const comments = [
    {
      id: 1,
      profile: "/Default Profile.png",
      nickname: "나",
      title: "오사카 여행 일지",
      comment:
        "내가 남긴 댓글입니다. 다음과 같이 내가 작성한 모든 댓글을 확인할 수 있습니다. 해당 카드를 클릭하면 댓글이 있는 포스팅로 이동합니다.",
    },
    {
      id: 2,
      profile: "/Default Profile.png",
      nickname: "나",
      title: "교토 여행 계획",
      comment:
        "교토 여행 계획 포스팅에 대한 내 댓글입니다. 좋은 정보 감사합니다.",
    },
    {
      id: 3,
      profile: "/Default Profile.png",
      nickname: "나",
      title: "일본 여행 준비물",
      comment: "준비물 리스트가 정말 꼼꼼하네요. 많은 도움이 되었습니다.",
    },
  ];

  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <EachCommentComp
          key={comment.id}
          profile={comment.profile}
          nickname={comment.nickname}
          title={comment.title}
          comment={comment.comment}
        />
      ))}
    </CommentsContainer>
  );
}

export default MyCommentComp;
