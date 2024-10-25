import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import ProfileStack from "../../../components/ProfileStack";
import { useNavigate } from "react-router";
import { cityCodeToName, nationCodeToName } from "../../../data/LocationCode";
import { useDispatch } from "react-redux";
import { setSelectedSpaceId } from "../../../redux/spaceSlice";

const Container = styled.div`
  display: flex;
  background-color: #fff;
  width: calc((100% - 30px) / 2);
  height: 210px;
  border-radius: 24px;
  padding: 24px 20px;
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
  width: 62%;
  height: 100%;
`;

const ImgArea = styled.div`
  width: 210px;
  height: 100%;

  position: relative;
`;

const Title = styled.div`
  font-size: ${theme.fontSizes.h3};
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
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  height: 75px;
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

const Images = styled.img`
  width: 210px;
  height: 120px;
  border-radius: 24px;
  background-color: ${theme.colors.neutral100};
  border: 2px solid #fff;

  &:nth-child(1) {
    position: absolute;
    right: -8.5px;
    bottom: 0;
    z-index: 5;
  }
  &:nth-child(2) {
    position: absolute;
    width: 180px;
    height: 100px;
    bottom: 40px;
    right: 6px;
    z-index: 4;
  }
  &:nth-child(3) {
    position: absolute;
    width: 150px;
    height: 80px;
    bottom: 75px;
    right: 20px;
    z-index: 3;
  }
`;

const NumArea = styled.div`
  padding: 2px 5px;
  position: absolute;
  background-color: black;
  color: white;
  border-radius: 5px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeight.regular};
  opacity: 0.5;
  z-index: 6;
  bottom: 49px;
  right: 41px;
`;

function SpaceCard({ space }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(space);
  const images = [
    "https://picsum.photos/300/300/?image=100",
    "https://picsum.photos/300/300/?image=101",
    "https://picsum.photos/300/300/?image=102",
    "https://picsum.photos/300/300/?image=103",
  ];
  return (
    <Container
      onClick={() => {
        dispatch(setSelectedSpaceId(space.spaceId));
        navigate(`/space/${space.spaceId}`);
      }}
    >
      <TextArea>
        <Title>
          <TitleText>{space.spaceName}</TitleText>
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
          <p>{`${cityCodeToName[space.cityCode]}, ${
            nationCodeToName[space.nationCode]
          }`}</p>
        </Location>
        <Description>{space.description}</Description>
        <Date>
          <DynamicSVG
            width={20}
            height={20}
            svgUrl="/calendar.svg"
            color={theme.colors.neutral700}
          />
          <p>
            {space.startDate} ~ {space.endDate}
          </p>
        </Date>
      </TextArea>
      <ImgArea>
        {images?.slice(0, 3).map((image) => {
          return <Images alt="" src={image} />;
        })}
        <NumArea>{`총 ${3}개의 포스팅이 있어요.`}</NumArea>
      </ImgArea>
    </Container>
  );
}

export default SpaceCard;
