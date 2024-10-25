import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleModal, selectModal } from "../../../redux/modalSlice";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { setScheduleAddModal } from "../../../redux/modalSlice";
import ScheduleAddModal from "./ScheduleAddModal";
import { deleteScheduleAsync } from "../../../redux/scheduleSlice";

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
  line-height: 50px;
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

const AddButton = styled.div`
  width: 100%;
  text-align: center;
  color: ${theme.colors.neutral400};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
  cursor: pointer;
  height: 52px;
  line-height: 52px;

  &:hover {
    opacity: 0.7;
  }
`;

function ScheduleModal({ groupedByDay, deleteSchedule, loadSpaceSchedule }) {
  const dispatch = useDispatch();
  const { scheduleModal, scheduleAddModal } = useSelector(selectModal);
  const [selectDay, setSelectDay] = useState(null);

  const handleClose = () => {
    dispatch(setScheduleModal(false));
  };

  const deleteButtonClick = (id) => {
    dispatch(deleteScheduleAsync(id))
      .unwrap()
      .then(() => {
        loadSpaceSchedule();
        alert("삭제되었습니다.");
      });
  };

  return (
    <CustomModal
      modal={scheduleModal}
      modalClose={handleClose}
      title="일정"
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
                  {schedules.length > 0 ? (
                    schedules.map((schedule, index) => (
                      <div style={{ position: "relative" }}>
                        <Sc key={schedule.scheduleId} isFirst={index === 0}>
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
                        <DynamicSVG
                          svgUrl="/minus-cirlce.svg"
                          color={theme.colors.neutral500}
                          style={{
                            position: "absolute",
                            top: "14px",
                            right: "-40px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteButtonClick(schedule.scheduleId)}
                        />
                      </div>
                    ))
                  ) : (
                    <Sc>
                      <div
                        style={{
                          textAlign: "center",
                          width: "100%",
                          color: "#bdbdbd",
                        }}
                      >
                        아직 일정이 없습니다.
                      </div>
                    </Sc>
                  )}
                </Wrap>
              </DayBox>
              <DayBox>
                <Day></Day>
                <Wrap>
                  <Sc>
                    <AddButton
                      onClick={() => {
                        setSelectDay(day);
                        dispatch(setScheduleAddModal(true));
                      }}
                    >
                      일정 추가하기
                    </AddButton>
                  </Sc>
                </Wrap>
              </DayBox>
            </>
          ))}
      </ContentArea>
      {scheduleAddModal && (
        <ScheduleAddModal
          selectDay={selectDay}
          loadSpaceSchedule={loadSpaceSchedule}
        />
      )}
    </CustomModal>
  );
}

export default ScheduleModal;
