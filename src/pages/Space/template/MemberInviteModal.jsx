import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { useSelector, useDispatch } from "react-redux";
import { selectModal, setMemberInviteModal } from "../../../redux/modalSlice";
import { addMembersAsync } from "../../../redux/spaceSlice";

const Title = styled.p`
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral700};
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral700};
  margin-bottom: 12px;
`;

const MemberWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
`;

const MemberCard = styled.div`
  height: 100px;
  border-radius: 24px;
  background-color: ${theme.colors.neutral100};
  width: calc(((100% - 90px) / 4));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  position: relative;
  transition: 0.1s;

  border: ${({ selected }) => selected && `1px solid ${theme.colors.primary}`};
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const NickName = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
`;
const Email = styled.p`
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral700};
`;

function MemberInviteModal({ members, spaceId, leaderId }) {
  const { memberInviteModal } = useSelector(selectModal);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setMemberInviteModal(false));
  };

  const memberClick = (member) => {
    if (selectedMembers.some((m) => m === member)) {
      const new_arr = selectedMembers.filter((m) => m !== member);
      setSelectedMembers(new_arr);
    } else {
      const new_arr = [...selectedMembers, member];
      setSelectedMembers(new_arr);
    }
  };

  const inviteMembers = () => {
    console.log(selectedMembers);
    dispatch(
      addMembersAsync({
        spaceId: spaceId,
        memberIds: selectedMembers.map((mem) => mem.userId),
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(setMemberInviteModal(false));
      })
      .catch((err) => alert(err));
  };

  return (
    <CustomModal
      modal={memberInviteModal}
      modalClose={handleClose}
      title="멤버 초대"
      titleIcon="/user-cirlce-add.svg"
      btnText="초대하기"
      btnClick={inviteMembers}
      large
    >
      <Title>내 이웃</Title>
      <SubTitle>내 이웃에서 멤버를 초대하세요!</SubTitle>
      <MemberWrapper>
        {members
          ?.filter((mem) => mem.userId !== leaderId)
          .map((member) => {
            return (
              <MemberCard
                selected={selectedMembers.some((m) => m === member)}
                key={member.userId}
                onClick={() => memberClick(member)}
              >
                <ProfileImg
                  src={
                    member.profile !== null
                      ? member.profile
                      : "/Default Profile.png"
                  }
                  alt=""
                />
                <NickName>{member.nickname}</NickName>
                <Email>{member.email}</Email>

                <DynamicSVG
                  svgUrl="/tick-square.svg"
                  color={theme.colors.primary}
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    right: "-5px",
                    transition: "0.1s",
                    opacity: selectedMembers.some((m) => m === member)
                      ? "1"
                      : "0",
                  }}
                />
              </MemberCard>
            );
          })}
      </MemberWrapper>
    </CustomModal>
  );
}

export default MemberInviteModal;
