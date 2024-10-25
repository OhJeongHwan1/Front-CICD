import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { convertToKoreanFormat } from "../../../utils/convertTime";
import ProfileStack from "../../../components/ProfileStack";

const SpaceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 100px;
  padding: 0 40px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral100};
`;

const IconText = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeight.light};
`;

const Title = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.header};
`;

const SpaceTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
`;

const SpaceCard = ({
  space,
  nation,
  city,
  spaceParticipantsProfile,
  spaceStartDate,
  spaceEndDate,
}) => {
  return (
    <SpaceCardContainer>
      <IconText>
        <DynamicSVG
          svgUrl="/location.svg"
          color={theme.colors.neutral700}
          width={20}
          height={20}
        />
        {city}, {nation}
      </IconText>
      <Title>
        <SpaceTitle>{space}</SpaceTitle>
        <ProfileStack
          profileList={spaceParticipantsProfile}
          size={20}
          borderColor={theme.colors.neutral50}
        />
      </Title>
      <IconText>
        <DynamicSVG
          svgUrl="/calendar.svg"
          color={theme.colors.neutral700}
          width={20}
          height={20}
        />
        {`${spaceStartDate} ~ ${spaceEndDate}`}
      </IconText>
    </SpaceCardContainer>
  );
};

export default SpaceCard;
