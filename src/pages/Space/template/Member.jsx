import React from "react";
import styled from "styled-components";
import DynamicSVG from "../../../components/DynamicSVG";
import theme from "../../../theme";

const Container = styled.div`
  height: 60px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;
function Member({ member, leaderId }) {
  // console.log(member.userId, leaderId);
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <ProfileImg
          alt="/Default Profile.png"
          src="/Default Profile.png"
          // {member.profile}
        />
        <p>{member.nickname}</p>
      </div>
      {member.userId === leaderId ? (
        <img src="/crown.svg" />
      ) : (
        <DynamicSVG
          svgUrl="/close-circle2.svg"
          color={theme.colors.neutral400}
          style={{ cursor: "pointer" }}
        />
      )}
    </Container>
  );
}

export default Member;
