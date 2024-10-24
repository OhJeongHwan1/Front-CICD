import React from "react";
import styled from "styled-components";
import theme from "../../../theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  padding: 20px;
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

function EachCommentComp({ profile, nickname, title, comment }) {
  return (
    <Container>
      <WhichPosting>
        <img src={profile} alt="./Default Profile.png" />
        <Nickname>{nickname}</Nickname>
        <span>의</span>&nbsp;
        <Title>{title}</Title>
      </WhichPosting>

      <Content>{comment}</Content>
    </Container>
  );
}

export default EachCommentComp;
