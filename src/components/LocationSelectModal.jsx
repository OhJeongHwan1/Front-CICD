import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { setLocationModal } from "../redux/modalSlice";
import { selectModal } from "../redux/modalSlice";
import { LocationCode } from "../data/LocationCode";
import styled from "styled-components";
import theme from "../theme";

const ButtonWrap = styled.div`
  display: flex;
  align-items: flex-start;
  height: 32px;
  border-bottom: 2px solid ${theme.colors.neutral200};
  justify-content: space-between;
`;

const LocationButton = styled.div`
  padding: 3px 13px;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primary};
  }
  border-bottom: ${({ selected }) =>
    selected ? `2px solid ${theme.colors.primary}` : `2px solid transparent`};
`;

const CitiesWrap = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px 20px;
`;

const CityWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 36px;
  width: calc((100% - 100px) / 6);
  border: 1px solid var(--neutral-300, #cbd5e1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  cursor: pointer;
  border: ${({ selected }) =>
    selected ? `1px solid ${theme.colors.primary}` : ``};
`;

function LocationSelectModal({ location, setLocation, origin }) {
  const dispatch = useDispatch();
  const { locationModal } = useSelector(selectModal);
  const [selectedLocation, setSelectedLocation] = useState(LocationCode[0]);

  const handleModalClose = (e) => {
    dispatch(setLocationModal(false));
    setLocation(origin);
    e.stopPropagation();
  };

  const locationSelect = (e) => {
    dispatch(setLocationModal(false));
    e.stopPropagation();
  };

  useEffect(() => {}, [LocationCode]);
  return (
    <CustomModal
      modal={locationModal}
      modalClose={handleModalClose}
      title="장소 선택"
      titleIcon="/location.svg"
      btnText="장소 선택하기"
      btnClick={locationSelect}
      large
    >
      <ButtonWrap>
        {LocationCode.map((loc) => {
          return (
            <LocationButton
              onClick={() => setSelectedLocation(loc)}
              selected={loc.location === selectedLocation.location}
            >
              {loc.location}
            </LocationButton>
          );
        })}
      </ButtonWrap>
      <CitiesWrap>
        {selectedLocation.citys.map((city) => {
          return (
            <CityWrap
              selected={city.name === location?.name}
              onClick={() => setLocation(city)}
            >
              {city.name}
            </CityWrap>
          );
        })}
      </CitiesWrap>
    </CustomModal>
  );
}

export default LocationSelectModal;
