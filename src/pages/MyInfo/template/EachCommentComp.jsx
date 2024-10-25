import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  padding: 20px;
  position: relative;
`;

const WhichPosting = styled.div`
  display: flex;
  color: ${theme.colors.neutral400};
  justify-content: start;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
  }
`;

const Nickname = styled.span`
  font-weight: ${theme.fontWeight.bold};
  margin-left: 10px;
`;

const Title = styled.span`
  font-weight: ${theme.fontWeight.bold};
`;

const Content = styled.p`
  padding-left: 41px;
  font-size: ${theme.fontSizes.md};
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 35px;
  right: 35px;
  cursor: pointer;
`;

function EachCommentComp({ profile, nickname, title, comment }) {
  return (
    <Container>
      <WhichPosting>
        <img src={profile} alt="profile" />
        <Nickname>{nickname}</Nickname>
        <span>의</span>&nbsp;
        <Title>{title}</Title>
      </WhichPosting>
      <Content>{comment}</Content>
      <DeleteButton>
        <DynamicSVG
          svgUrl={"./close-circle.svg"}
          color={theme.colors.neutral400}
        />
      </DeleteButton>
    </Container>
  );
}

export default EachCommentComp;
