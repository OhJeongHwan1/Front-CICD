import React from "react";
import styled from "styled-components";
import theme from "../theme";

const StyledPosting = styled.div`
  width: ${({ width }) => `${width}%`};
  height: ${({ isMine }) => (isMine ? `420px` : `450px`)};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 240px;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 240px);
  padding: ${({ isMine }) =>
    isMine ? `10px 20px 20px 20px` : `10px 20px 5px 20px`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ isMine }) =>
    !isMine
      ? `
    border-bottom: 1px solid ${theme.colors.neutral200};
  `
      : ""};
`;

const Title = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
`;

const Desciption = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral700};
  padding: 10px 0;
  line-height: 24px;
`;

const PostingInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentsCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.sm};
`;

const PostingDate = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
`;

const ProfileContainer = styled.div`
  padding: 5px 20px 10px 20px;
`;

const Profile = styled.div`
  display: flex;
  gap: 4px;
`;

function PostingCard({
  width,
  postingId,
  title,
  mainImg,
  content,
  commentsCount,
  createAt,
  isMine,
  nickname,
  profileImg,
}) {
  return (
    <StyledPosting width={width} isMine={isMine}>
      <ImageContainer>
        <StyledImg
          src={mainImg}
          alt="main image"
          loading="lazy"
          decoding="async"
          onLoad={(e) => {}}
        />
      </ImageContainer>
      <ContentContainer isMine={isMine}>
        <div>
          <Title>{title}</Title>
          <Desciption>{content}</Desciption>
        </div>
        <PostingInfo>
          <CommentsCount>
            <img
              src="/message-text.svg"
              width="20px"
              height="20px"
              alt="댓글"
            />
            <div>{commentsCount}</div>
          </CommentsCount>
          <PostingDate>{createAt}</PostingDate>
        </PostingInfo>
      </ContentContainer>
      {!isMine}
      <ProfileContainer>
        <Profile>
          <div>
            <StyledImg
              src={mainImg}
              alt="main image"
              loading="lazy"
              decoding="async"
              onLoad={(e) => {}}
            />
          </div>
        </Profile>
      </ProfileContainer>
    </StyledPosting>
  );
}

export default PostingCard;
