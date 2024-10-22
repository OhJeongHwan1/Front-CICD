import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import SideButton from "./SideButton";

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 810px;
  height: 80px;
  background-color: #fff;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));

  &::after {
    content: ""; // 가상 요소에는 content 속성이 필수
    display: block;
    position: relative;
    left: 0;
    bottom: 0px;
    width: 80px;
    height: 100vh;
    background: #fff; // 가벼운 그림자 효과
    filter: drop-shadow(4px 10px 4px rgba(0, 0, 0, 0.1));
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 80px;
  top: 16px;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 80px;
  left: 80px;
  z-index: 5;
`;

const SideButtonWrap = styled.div`
  position: absolute;
  width: 50px;
  height: 290px;
  left: 15px;
  top: 140px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function NavigationBar() {
  return (
    <NavContainer>
      <div className="flex items-center h-[80px] gap-[70px]">
        <img style={{ margin: "8px 0 0 8px" }} src="./Logo.svg" alt="" />
        <Input
          type="search"
          placeholder="여행 기록을 검색해보세요!"
          width={`450px`}
        />
      </div>

      <ButtonWrap>
        <Button width={`110px`} text="로그인" />
      </ButtonWrap>
      <StyledImage src="/blank.svg" />

      <SideButtonWrap>
        <SideButton />
        <SideButton />
        <SideButton />
        <SideButton />
      </SideButtonWrap>
    </NavContainer>
  );
}

export default NavigationBar;
