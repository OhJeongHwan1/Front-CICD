import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { selectSpace } from "../../redux/spaceSlice";
import { useDispatch, useSelector } from "react-redux";
import DynamicSVG from "../../components/DynamicSVG";
import { nationCodeToName, cityCodeToName } from "../../data/LocationCode";
import JoinMember from "./template/JoinMember";
import Schedule from "./template/Schedule";
import PostingList from "./template/PostingList";
import ScheduleModal from "./template/ScheduleModal";
import { selectModal, setSpaceEditModal } from "../../redux/modalSlice";
import SpaceEditModal from "./template/SpaceEditModal";
import MemberInviteModal from "./template/MemberInviteModal";
import {
  getSpaceDetailAsync,
  setSpaceDetail,
  getSpacePostingListAsync,
  setPostingList,
  getSpaceScheduleListAsync,
  setScheduleList,
} from "../../redux/spaceSlice";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-right: 30px;
  min-width: 1280px;
  padding-top: 30px;
  position: relative;
  top: -30px;
  background-color: #f1f5f9;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral600};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TopArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SideWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SideItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral600};
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral400};
  margin-bottom: 15px;
`;

const MiddleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  gap: 20px;
`;

function Space() {
  const { spaceDetail, selectedSpaceId, postingList, scheduleList } =
    useSelector(selectSpace);
  const { spaceEditModal, memberInviteModal } = useSelector(selectModal);
  const [groupedByDay, setGroupdedByDay] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpaceDetailAsync(selectedSpaceId))
      .unwrap()
      .then((res) => dispatch(setSpaceDetail(res)))
      .catch((err) => console.log(err.message));

    dispatch(getSpacePostingListAsync(selectedSpaceId))
      .unwrap()
      .then((res) => dispatch(setPostingList(res)))
      .catch((err) => console.log(err.message));

    dispatch(getSpaceScheduleListAsync(selectedSpaceId))
      .unwrap()
      .then((res) => dispatch(setScheduleList(res)))
      .catch((err) => console.log(err.message));
  }, [selectedSpaceId]);

  useEffect(() => {
    setGroupdedByDay(groupSchedulesByDay(scheduleList));
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

  const deleteSchedule = (scheduleid, spaceId) => {
    alert(scheduleid + spaceId);
  };

  return (
    <Container>
      <TopArea>
        <Title>
          <p>{spaceDetail.spaceName}</p>
          <DynamicSVG
            svgUrl="/setting-2.svg"
            width={42}
            height={42}
            color={theme.colors.neutral400}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(setSpaceEditModal(true))}
          />
        </Title>
        <SideWrap>
          <SideItem>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral600}
            />
            <p>{`${spaceDetail.startDate} ~ ${spaceDetail.endDate}`}</p>
          </SideItem>
          <SideItem>
            <DynamicSVG
              svgUrl="/location.svg"
              color={theme.colors.neutral600}
            />
            <p>
              {`
              ${cityCodeToName[spaceDetail.cityCode]}, ${
                nationCodeToName[spaceDetail.nationCode]
              }
              `}
            </p>
          </SideItem>
        </SideWrap>
      </TopArea>
      <Description>{spaceDetail.description}</Description>

      <MiddleArea>
        <JoinMember
          maxMembers={spaceDetail.maxMembers}
          members={spaceDetail.members}
          leaderId={spaceDetail.leaderId}
          spaceId={spaceDetail.spaceId}
        />
        <Schedule groupedByDay={groupedByDay} />
      </MiddleArea>
      <PostingList postingList={postingList} />
      <ScheduleModal
        groupedByDay={groupedByDay}
        deleteSchedule={deleteSchedule}
      />
      {spaceEditModal && <SpaceEditModal spaceDetail={spaceDetail} />}
      {memberInviteModal && (
        <MemberInviteModal
          members={spaceDetail.members}
          spaceId={spaceDetail.spaceId}
        />
      )}
    </Container>
  );
}

export default Space;
