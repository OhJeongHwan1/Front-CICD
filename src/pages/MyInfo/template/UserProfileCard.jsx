import React, { useState } from "react";
import theme from "../../../theme";
import styled from "styled-components";
import DynamicSVG from "../../../components/DynamicSVG";
import UserProfileModal from "./UserProfileModal";

const Border = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Nickname = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

function UserProfileCard({ user }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Border
        onClick={handleModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-cetner items-center pl-7 pr-7 pt-4 pb-4">
          <div className="flex justify-center items-center">
            <img
              src={user.profile}
              style={{ minWidth: "60px", height: "auto" }}
            />
          </div>
          <div className="flex flex-col ml-7">
            <Nickname>{user.nickName}</Nickname>
            <Email>{user.email}</Email>
          </div>
          <DynamicSVG
            className="ml-4 pr-5"
            svgUrl={"/setting.svg"}
            width={45}
            height={45}
            color={isHovered ? `${theme.colors.neutral400}` : "white"}
          />
        </div>
      </Border>
      <UserProfileModal
        isOpen={isModalOpen}
        onClose={handleModal}
        profile={user.profile}
        email={user.email}
        nickname={user.nickName}
      />
    </>
  );
}

export default UserProfileCard;
