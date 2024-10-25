import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { useState } from "react";
import SpaceSelectorModal from "./SpaceSelectorModal";
import { nationCodeToName, cityCodeToName } from "../../../data/LocationCode";

const SpaceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 5px;
  padding: 10px 20px;
  cursor: pointer;

  transition: 200ms;

  &:hover {
    transform: scale(0.985);
  }
`;

const Space = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
`;

const SpaceSelector = ({ space, setSpace, spaceList }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {
        <SpaceSelectorModal
          setSpace={setSpace}
          isModal={isModal}
          setIsModal={setIsModal}
          spaceList={spaceList}
        />
      }
      <SpaceArea onClick={() => setIsModal(!isModal)}>
        <Space>스페이스를 선택하세요</Space>
        <Location>
          <DynamicSVG svgUrl="/location.svg" color={theme.colors.neutral400} />
          {`${
            space.cityCode === undefined
              ? "도시"
              : cityCodeToName[space.cityCode]
          }, ${
            space.nationCode === undefined
              ? "국가"
              : nationCodeToName[space.nationCode]
          }`}
        </Location>
      </SpaceArea>
    </>
  );
};

export default SpaceSelector;
