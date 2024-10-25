import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import ProfileStack from "../../../components/ProfileStack";
import { useNavigate } from "react-router";
import { nationCodeToName, cityCodeToName } from "../../../data/LocationCode";
import { useDispatch } from "react-redux";
import { setSelectedSpaceId } from "../../../redux/spaceSlice";

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

function SmallSpaceCard({ space, setSpace, setIsModal }) {
  const dispatch = useDispatch();

  const cardSelect = () => {
    dispatch(setSelectedSpaceId(space.spaceId));
    setSpace(space);
    console.log(space);
    alert("설정되었습니다.");
    setIsModal(false);
  };
  return (
    <Container onClick={cardSelect}>
      <TextArea>
        <Title>
          <TitleText>{space.spaceName}</TitleText>
          {space?.members?.length !== 0 && (
            <ProfileStack
              profileList={space?.members?.map((mem) => mem.profile)}
              borderColor={theme.colors.neutral100}
            />
          )}
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
          <p>{`${space.startDate} ~ ${space.endDate}`}</p>
        </Date>
      </TextArea>
    </Container>
  );
}

export default SmallSpaceCard;
