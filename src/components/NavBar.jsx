import React from "react";
import styled from "styled-components";

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: #fff;

  &::after {
    content: ""; // 가상 요소에는 content 속성이 필수
    display: block;
    position: absolute;
    left: 0;
    bottom: 0px; // 네비게이션 바 바로 아래에 위치
    width: 80px;
    height: 100%;
    background: rgba(0, 0, 0, 1); // 가벼운 그림자 효과
  }
`;

function NavigationBar() {
  return <NavContainer>NavigationBar</NavContainer>;
}

export default NavigationBar;
