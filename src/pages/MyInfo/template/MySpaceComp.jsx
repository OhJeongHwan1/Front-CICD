import React from "react";
import styled from "styled-components";
import SpaceCard from "./SpaceCard";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
`;

function MySpaceComp({ mySpace }) {
  return (
    <Container>
      {mySpace?.map((space) => {
        return <SpaceCard space={space} />;
      })}
    </Container>
  );
}

export default MySpaceComp;
