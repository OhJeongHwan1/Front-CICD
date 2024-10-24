import styled from "styled-components";
import React, { useEffect, useState } from "react";
import DynamicSVG from "../../../components/DynamicSVG";
import theme from "../../../theme";
import LocationSelectModal2 from "./LocationSelectModal2";
import { useDispatch, useSelector } from "react-redux";
import { selectModal, setLocationModal2 } from "../../../redux/modalSlice";
import { nationCodeToName, cityCodeToName } from "../../../data/LocationCode";

const StyledButton = styled.div`
  cursor: pointer;
  width: ${({ width }) => width};
  background-color: ${({ color }) => color};
  height: 45px;
  border-radius: 100px;
  &:hover {
    opacity: 0.7;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StyledP = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
`;

function SelectedButton2({ setLocate, width, color, locate }) {
  const [location2, setLocation2] = useState(
    locate
      ? {
          name: cityCodeToName[locate.city],
          city: locate.city,
          nation: locate.nation,
          nationName: nationCodeToName[locate.nation],
        }
      : null
  );
  const [origin, setOrigin] = useState(0);
  const dispatch = useDispatch();
  const { locationModal2 } = useSelector(selectModal);

  useEffect(() => {
    setLocate(location2);
  }, [location2]);

  return (
    <StyledButton
      width={width}
      color={color}
      onClick={() => {
        dispatch(setLocationModal2(true));
      }}
    >
      <DynamicSVG svgUrl="/location.svg" color={theme.colors.neutral700} />
      <StyledP>
        {location2
          ? `${location2?.name}, ${location2.nationName}`
          : `장소를 선택해주세요.`}
      </StyledP>
      {locationModal2 && (
        <LocationSelectModal2
          setOrigin={setOrigin}
          origin={origin}
          location2={location2}
          setLocation2={setLocation2}
        />
      )}
    </StyledButton>
  );
}

export default SelectedButton2;
