import React from "react";
import styled from "styled-components";
import theme from "../theme";

const StyledPosting = styled.div`
  width: 330px;
  height: 450px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 56.25%;
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
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const PostingInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

function PostingCard({
  postingId,
  title,
  travelDate,
  mainImg,
  content,
  nickname,
  profileImg,
  createAt,
}) {
  return (
    <StyledPosting>
      <ImageContainer>
        <StyledImg
          src={mainImg}
          alt="main image"
          loading="lazy"
          decoding="async"
          onLoad={(e) => {}}
        />
      </ImageContainer>
      <ContentContainer>
        <div>
          <Title>{title}</Title>
          <Desciption>{content}</Desciption>
        </div>
        <div>
          <PostingInfo>
            
          </PostingInfo>
        </div>
      </ContentContainer>
    </StyledPosting>
  );
}

export default PostingCard;
