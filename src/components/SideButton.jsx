import React from "react";
import styled from "styled-components";
import theme from "../theme";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: ${theme.colors.neutral200};
`;

function SideButton({ icon, btnClick }) {
  return <Wrapper></Wrapper>;
}

export default SideButton;
