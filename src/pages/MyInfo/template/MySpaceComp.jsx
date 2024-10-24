import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import SpaceCard from "./SpaceCard";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
`;

function MySpaceComp() {
  return (
    <Container>
      <SpaceCard />
      <SpaceCard />
      <SpaceCard />
      <SpaceCard />
    </Container>
  );
}

export default MySpaceComp;
