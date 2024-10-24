import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import ProfileStack from "../../../components/ProfileStack";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  background-color: ${theme.colors.neutral100};
  width: 100%;
  height: 130px;
  border-radius: 24px;
  padding: 10px 20px;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  display: flex;
  justify-content: space-between;
`;

const TextArea = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral700};
  display: flex;
  align-items: center;
  gap: 8px;
`;
const TitleText = styled.div`
  max-width: 70%;
  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;

const Location = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral700};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: 25px;
`;

const Date = styled.div`
  margin-top: 5px;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
  display: flex;
  align-items: center;
  gap: 8px;
`;

function SmallSpaceCard({ onClick }) {
  const navigate = useNavigate();

  return (
    <Container onClick={onClick}>
      <TextArea>
        <Title>
          <TitleText>오사카 여행</TitleText>
          <ProfileStack
            profileList={[
              "https://i.imgur.com/VnZtNxH.png",
              "https://i.imgur.com/aXtrK5E.png",
              "https://i.imgur.com/UIAinYd.png",
              "https://i.imgur.com/QHfydVa.png",
              "https://i.imgur.com/VXvXELL.png",
              "https://i.imgur.com/D4UpBrx.png",
            ]}
            borderColor={theme.colors.neutral100}
          />
        </Title>
        <Location>
          <DynamicSVG
            width={20}
            height={20}
            svgUrl="/location.svg"
            color={theme.colors.neutral700}
          />
          <p>오사카, 일본</p>
        </Location>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          repellat, et ipsa rem pariatur tempora optio a unde magni explicabo
          vitae consequuntur nulla, quasi illo non commodi odit placeat eos!
        </Description>
        <Date>
          <DynamicSVG
            width={20}
            height={20}
            svgUrl="/calendar.svg"
            color={theme.colors.neutral700}
          />
          <p>2024-10-24 ~ 2024-10-25</p>
        </Date>
      </TextArea>
    </Container>
  );
}

export default SmallSpaceCard;
