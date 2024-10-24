import React, { useEffect, useState } from "react";
import CustomModal2 from "./CustomModal2";
import { useDispatch, useSelector } from "react-redux";
import { selectModal, setLocationModal2 } from "../../../redux/modalSlice";
import { LocationCode } from "../../../data/LocationCode";
import styled from "styled-components";
import theme from "../../../theme";

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

function LocationSelectModal2({ location2, setLocation2, origin, setOrigin }) {
  const dispatch = useDispatch();
  const [realOrigin, setRealOrigin] = useState(origin);
  const { locationModal2 } = useSelector(selectModal);
  const [selectedLocation2, setSelectedLocation2] = useState(
    LocationCode[origin]
  );
  const [selectLocate, setSelectLocate] = useState(location2);

  const handleModalClose = (e) => {
    dispatch(setLocationModal2(false));
    setOrigin(realOrigin);
    e.stopPropagation();
  };

  const locationSelect = (e) => {
    dispatch(setLocationModal2(false));
    setLocation2(selectLocate);
    e.stopPropagation();
  };

  useEffect(() => {}, [LocationCode]);
  return (
    <CustomModal2
      modal={locationModal2}
      modalClose={handleModalClose}
      title="장소 선택"
      titleIcon="/location.svg"
      btnText="장소 선택하기"
      btnClick={locationSelect}
      btnDisable={selectLocate === null}
      large
    >
      <ButtonWrap>
        {LocationCode.map((loc, i) => {
          return (
            <LocationButton
              onClick={() => {
                setSelectedLocation2(loc);
                setOrigin(i);
              }}
              selected={loc.location === selectedLocation2.location}
            >
              {loc.location}
            </LocationButton>
          );
        })}
      </ButtonWrap>
      <CitiesWrap>
        {selectedLocation2.citys.map((city) => {
          return (
            <CityWrap
              selected={city.name === selectLocate?.name}
              onClick={() => setSelectLocate(city)}
            >
              {city.name}
            </CityWrap>
          );
        })}
      </CitiesWrap>
    </CustomModal2>
  );
}

export default LocationSelectModal2;
