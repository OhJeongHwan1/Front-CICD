import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { useEffect, useState } from "react";
import ScheduleSelectorModal from "./ScheduleSelectorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSpace,
  getSpaceScheduleListAsync,
} from "../../../redux/spaceSlice";

const ScheduleSelectorContainer = styled.div`
  height: 48px;
  background: ${({ disabled }) =>
    disabled ? `${theme.colors.neutral300}` : `${theme.colors.neutral500}`};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-left: 20px;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    ${({ disabled }) => !disabled && `transform: scale(0.99)`};
  }
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.neutral50};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.light};
`;

const NoneIconTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.neutral50};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
`;

const ScheduleSelector = ({ setSchedule, disabled, schedule }) => {
  const { selectedSpaceId } = useSelector(selectSpace);
  const [isModal, setIsModal] = useState(false);
  const [groupedByDay, setGroupdedByDay] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpaceScheduleListAsync(selectedSpaceId))
      .unwrap()
      .then((res) => {
        setGroupdedByDay(groupSchedulesByDay(res));
      })
      .catch((err) => console.log(err.message));
  }, [selectedSpaceId]);

  const groupSchedulesByDay = (scheduleList) => {
    // if (scheduleList) scheduleList?.sort((a, b) => a?.day?.localeCompare(b?.day));
    return scheduleList.reduce((groups, sch) => {
      const { day } = sch;
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(sch);
      return groups;
    }, {});
  };

  return (
    <>
      {
        <ScheduleSelectorModal
          setSchedule={setSchedule}
          isModal={isModal}
          setIsModal={setIsModal}
          groupedByDay={groupedByDay}
        />
      }
      <ScheduleSelectorContainer
        onClick={() => !disabled && setIsModal(!isModal)}
        disabled={disabled}
      >
        <InfoArea>
          <IconTextArea>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral50}
              width={20}
              height={20}
            />
            {schedule.day ? schedule.day : "날짜"}
          </IconTextArea>
          <IconTextArea>
            <DynamicSVG
              svgUrl="/location.svg"
              color={theme.colors.neutral50}
              width={20}
              height={20}
            />
            {schedule.spot ? schedule.spot : "장소"}
          </IconTextArea>
          <NoneIconTextArea>
            {schedule.memo ? schedule.memo : "메모"}
          </NoneIconTextArea>
        </InfoArea>
        <img src="/arrow-down.svg" width={16} height={16} />
      </ScheduleSelectorContainer>
    </>
  );
};

export default ScheduleSelector;
