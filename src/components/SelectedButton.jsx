import styled from "styled-components";
import React, { useEffect, useState } from "react";
import DynamicSVG from "./DynamicSVG";
import theme from "../theme";
import LocationSelectModal from "./LocationSelectModal";
import { useDispatch, useSelector } from "react-redux";
import { setLocationModal, selectModal } from "../redux/modalSlice";
import { nationCodeToName, cityCodeToName } from "../data/LocationCode";

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

function SelectedButton({ setLocate, width, color, locate }) {
  const [location, setLocation] = useState(
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
  const { locationModal } = useSelector(selectModal);

  useEffect(() => {
    setLocate(location);
  }, [location]);

  return (
    <StyledButton
      width={width}
      color={color}
      onClick={() => {
        dispatch(setLocationModal(true));
      }}
    >
      <DynamicSVG svgUrl="/location.svg" color={theme.colors.neutral700} />
      <StyledP>
        {location
          ? `${location?.name}, ${location.nationName}`
          : `장소를 선택해주세요.`}
      </StyledP>
      {locationModal && (
        <LocationSelectModal
          setOrigin={setOrigin}
          origin={origin}
          location={location}
          setLocation={setLocation}
        />
      )}
    </StyledButton>
  );
}

export default SelectedButton;
