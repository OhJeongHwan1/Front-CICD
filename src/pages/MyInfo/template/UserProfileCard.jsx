import React from "react";
import theme from "../../../theme";
import styled from "styled-components";

const Border = styled.div`
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.div`
  color: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

function UserProfileCard(props) {
  return (
    <Border>
      <div className="flex justify-cetner items-center p-7">
        <div className="flex justify-center items-center">
          <img src="./Default Profile.png"></img>
        </div>
        <div className="flex flex-col ml-7">
          <Nickname>{props.nickname}</Nickname>
          <Email>{props.email}</Email>
        </div>
      </div>
    </Border>
  );
}

export default UserProfileCard;
