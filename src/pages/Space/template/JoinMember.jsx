import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import Member from "./Member";
import { setMemberInviteModal } from "../../../redux/modalSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: calc(36% - 20px);
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

const Bottom = styled.div`
  display: flex;
  padding: 0 32px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  border-top: 1px solid ${theme.colors.neutral200};
  position: absolute;
  bottom: 0;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  z-index: 10;
  background-color: #fff;
  border-radius: 0 0 30px 30px;
`;

const ContentArea = styled.div`
  width: 100%;
  height: 135px;
  overflow-y: auto;

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

  & > *:nth-child(odd) {
    background-color: ${theme.colors.neutral50};
  }
  & > *:nth-child(even) {
    background-color: #ffffff;
  }
`;

const InviteMessage = styled.div`
  color: ${theme.colors.primary};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primaryDark};
    font-weight: ${theme.fontWeight.regular};
  }
`;

function JoinMember({ maxMembers, members, leaderId, spaceId }) {
  const dispatch = useDispatch();
  const renderMessage = () => {
    if (maxMembers > members?.length)
      return (
        <div className="flex gap-[6px]">
          <p>아직 멤버를 초대할 수 있어요!</p>
          <InviteMessage onClick={() => dispatch(setMemberInviteModal(true))}>
            멤버 초대하기
          </InviteMessage>
        </div>
      );
    else return "인원이 가득 찼습니다.";
  };
  return (
    <Container>
      <Top>
        <p>{`참여 멤버 (${members?.length}/${maxMembers})`}</p>
      </Top>

      <ContentArea>
        {members?.map((member) => {
          return (
            <Member member={member} leaderId={leaderId} spaceId={spaceId} />
          );
        })}
      </ContentArea>
      <Bottom>
        <p>{renderMessage()}</p>
      </Bottom>
    </Container>
  );
}

export default JoinMember;
