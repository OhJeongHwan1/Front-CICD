import React, { useState } from "react";
import theme from "../../../theme";
import styled from "styled-components";
import DynamicSVG from "../../../components/DynamicSVG";
import CustomModal from "../../../components/CustomModal";

const Border = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

const Nickname = styled.div`
  color: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

function UserProfileCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {};

  return (
    <>
      <Border
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-cetner items-center pl-7 pr-7 pt-4 pb-4">
          <div className="flex justify-center items-center">
            <img
              src="./Default Profile.png"
              style={{ minWidth: "80px", height: "auto" }}
            ></img>
          </div>
          <div className="flex flex-col ml-7">
            <Nickname>{props.nickname}</Nickname>
            <Email>{props.email}</Email>
          </div>
          <DynamicSVG
            className="ml-4 pr-5"
            svgUrl={"/setting.svg"}
            width={45}
            height={45}
            color={isHovered ? `${theme.colors.neutral400}` : "white"}
          ></DynamicSVG>
        </div>
      </Border>
      <CustomModal
        titleIcon={"/user-tag.svg"}
        title={"내 정보 수정"}
        modal={false}
        modalClose={handleClose}
        noBottom={true}
      >
        <div></div>
      </CustomModal>
    </>
  );
}

export default UserProfileCard;
