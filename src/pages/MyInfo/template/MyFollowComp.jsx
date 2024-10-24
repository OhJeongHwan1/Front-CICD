import React from "react";
import styled from "styled-components";
import EachFollowComp from "./EachFollowComp";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
  width: 100%;
`;

const dummyData = [
  { nickname: "User1", email: "user1@example.com" },
  { nickname: "User2", email: "user2@example.com" },
  { nickname: "User3", email: "user3@example.com" },
  { nickname: "User4", email: "user4@example.com" },
  { nickname: "User5", email: "user5@example.com" },
];

function MyFollowComp() {
  return (
    <Container>
      {dummyData.map((user, index) => (
        <EachFollowComp
          key={index}
          nickname={user.nickname}
          email={user.email}
        />
      ))}
    </Container>
  );
}

export default MyFollowComp;
