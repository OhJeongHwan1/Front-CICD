import React, { useEffect, useState } from "react";
import theme from "../../../theme";
import styled from "styled-components";
const Container = styled.div`
  width: calc(64% - 20px);
  background-color: #fff;
  height: 240px;
  border-radius: 24px;
  position: relative;
`;

const Top = styled.div`
  height: 60px;
  border-bottom: 1px solid ${theme.colors.neutral200};
  width: 100%;
  display: flex;
  padding: 0 32px;
  align-items: center;
  justify-content: space-between;

  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
`;

const ContentArea = styled.div`
  width: 100%;
  height: 165px;
  overflow-y: auto;
  padding: 0 32px;

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

const Day = styled.div``;

function Schedule({ scheduleList }) {
  const [groupedByDay, setGroupdedByDay] = useState(null);
  useEffect(() => {
    setGroupdedByDay(groupSchedulesByDay(scheduleList));
    console.log(groupedByDay);
  }, [scheduleList]);

  const groupSchedulesByDay = (scheduleList) => {
    return scheduleList.reduce((groups, schedule) => {
      const { day } = schedule;
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(schedule);
      return groups;
    }, {});
  };

  return (
    <Container>
      <Top>일정</Top>
      <ContentArea>
        {groupedByDay &&
          Object.entries(groupedByDay).map(([day, schedules]) => (
            <DayBox key={day}>
              <h3>{day}일</h3>
              {schedules.map((schedule) => (
                <div key={schedule.scheduleId}>
                  {schedule.spot} - {schedule.memo}
                </div>
              ))}
            </DayBox>
          ))}
      </ContentArea>
    </Container>
  );
}

export default Schedule;
