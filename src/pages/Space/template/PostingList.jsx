import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import PostingCard from "../../../components/PostingCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router";
import Button from "../../../components/Button";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral600};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TopArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PostingArea = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

function PostingList({ postingList }) {
  // const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  const moveToPostingDetail = (id) => {
    navigate(`/posting/detail/${id}`);
  };
  const moveToPostingAdd = (id) => {
    navigate(`/posting/add`);
  };

  return (
    <Container>
      <TopArea>
        <Title>
          <DynamicSVG
            svgUrl="/note-2.svg"
            color={theme.colors.neutral600}
            width={48}
            height={48}
          />
          <p>포스팅 목록</p>
        </Title>
        <Button width={"160px"} type="posting" btnClick={moveToPostingAdd} />
      </TopArea>

      <PostingArea>
        {postingList?.map((posting, i) => {
          return (
            <PostingCard
              key={posting.postingId}
              width={`calc((100% - 60px) / 5)`}
              title={posting.title}
              mainImg={posting.mainImgUrl}
              content={posting.content}
              commentsCount={posting.commentCnt}
              createAt={posting.createdAt}
              nickname={posting.writerNickname}
              // isMine={user.nickname === posting.wirterNickname}
              profileImg={posting.profile}
              // 작성자 profile 이미지 추가되야함.
              onClick={() => moveToPostingDetail(posting.postingId)}
            />
          );
        })}
      </PostingArea>
    </Container>
  );
}

export default PostingList;
