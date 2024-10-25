import React from "react";
import theme from "../../../theme";
import styled from "styled-components";
import DynamicSVG from "../../../components/DynamicSVG";
import { setScheduleModal } from "../../../redux/modalSlice";
import { useDispatch } from "react-redux";

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
  height: 160px;
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

const Sc2 = styled.div`
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

const Detail = styled.div`
  cursor: pointer;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`;

function Schedule({ groupedByDay }) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Top>
        <p>일정</p>
        <Detail onClick={() => dispatch(setScheduleModal(true))}>
          자세히 보기
        </Detail>
      </Top>
      <ContentArea>
        {groupedByDay &&
          Object.entries(groupedByDay).map(([day, schedules]) => (
            <DayBox key={day}>
              <Day>{day.split("-")[2]}일</Day>
              <Wrap>
                {schedules.length ? (
                  schedules.map((schedule, index) => (
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
                  ))
                ) : (
                  <Sc2>
                    <div
                      style={{
                        textAlign: "center",
                        width: "100%",
                        color: "#bdbdbd",
                      }}
                    >
                      아직 일정이 없습니다.
                    </div>
                  </Sc2>
                )}
              </Wrap>
            </DayBox>
          ))}
      </ContentArea>
    </Container>
  );
}

export default Schedule;
