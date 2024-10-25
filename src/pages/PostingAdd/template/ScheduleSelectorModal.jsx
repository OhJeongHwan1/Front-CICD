import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";

const ContentArea = styled.div`
  width: 100%;

  overflow-y: auto;
  padding: 0 32px;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 241, 255, 0.8);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 5px 0;
  }

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DayBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Day = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
`;

const Wrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 50px;
`;

const Sc = styled.div`
  width: "100%";
  border-radius: 20px;
  background-color: ${({ isFirst }) =>
    isFirst ? `${theme.colors.neutral500}` : `${theme.colors.neutral100}`};
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  div {
    color: ${({ isFirst }) =>
      isFirst ? `${theme.colors.neutral50}` : ` ${theme.colors.neutral500}`};
    font-size: ${theme.fontSizes.sm};
    font-weight: ${theme.fontWeight.regular};
  }
`;

function ScheduleSelectorModal({
  groupedByDay,
  isModal,
  setIsModal,
  setSchedule,
}) {
  // const dispatch = useDispatch();

  const selectSchedule = (schedule) => {
    setSchedule(schedule);

    alert("설정되었습니다.");
    setIsModal(false);
  };

  return (
    <CustomModal
      modal={isModal}
      modalClose={() => setIsModal(!isModal)}
      title="일정 선택"
      titleIcon="/location.svg"
      noBottom
      large
    >
      <ContentArea>
        {groupedByDay &&
          Object.entries(groupedByDay).map(([day, schedules]) => (
            <>
              <DayBox key={day}>
                <Day>{day.split("-")[2]}일</Day>
                <Wrap>
                  {schedules.map((schedule, index) => (
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <Sc
                        key={schedule.scheduleId}
                        onClick={() => selectSchedule(schedule)}
                        isFirst={index === 0}
                      >
                        <div>{schedule.memo}</div>
                        <div className="flex items-center gap-[8px]">
                          <div>{schedule.spot}</div>
                          <DynamicSVG
                            svgUrl="/location.svg"
                            color={
                              index === 0
                                ? theme.colors.neutral50
                                : theme.colors.neutral500
                            }
                            width={20}
                            height={20}
                          />
                        </div>
                      </Sc>
                    </div>
                  ))}
                </Wrap>
              </DayBox>
              <DayBox>
                <Day></Day>
              </DayBox>
            </>
          ))}
      </ContentArea>
    </CustomModal>
  );
}

export default ScheduleSelectorModal;
