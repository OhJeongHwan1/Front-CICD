import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import SideButton from "./SideButton";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import theme from "../theme";
import { userLogOut } from "../redux/userSlice";

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1000px;
  height: 80px;
  background-color: #fff;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
  z-index: 101;

  &::after {
    content: ""; // 가상 요소에는 content 속성이 필수
    display: ${({ isRegister }) => (isRegister ? "none" : "block")};
    position: relative;
    left: 0;
    bottom: 0px;
    width: 80px;
    height: 100vh;
    background: #fff; // 가벼운 그림자 효과
    filter: drop-shadow(4px 10px 4px rgba(0, 0, 0, 0.1));
  }
`;

const RightWrap = styled.div`
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

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const NickName = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.regular};
`;

const DeleteButton = styled.div`
  position: absolute;
  left: 15px;
  top: 580px;
  z-index: 7;
`;

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(selectUser);

  const moveToMain = () => {
    navigate(`/`);
  };
  const moveToMyInfo = () => {
    navigate(`/myInfo`);
  };
  const openModal = () => {};
  const moveToPosting = () => {
    navigate(`/posting/add`);
  };

  const logout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      dispatch(userLogOut());
    }
  };
  return (
    <NavContainer isRegister={location.pathname === "/register"}>
      <div className="flex items-center h-[80px] gap-[70px]">
        <img
          style={{
            margin:
              location.pathname === "/register"
                ? "8px 0 0 8px"
                : "18px 0 0 18px",
          }}
          src="/Logo.svg"
          alt=""
        />
        <Input
          type="search"
          placeholder="여행 기록을 검색해보세요!"
          width={`450px`}
        />
      </div>

      <RightWrap>
        {user.nickname === null ? (
          <Button width={`110px`} text="로그인" />
        ) : (
          <div
            className="flex items-center gap-[24px] cursor-pointer"
            onClick={moveToMyInfo}
          >
            <ProfileImg alt="" src={user.profile} />
            <NickName>{user.nickname}</NickName>
          </div>
        )}
      </RightWrap>
      {location.pathname !== "/register" && (
        <>
          <StyledImage src="/blank.svg" />

          <SideButtonWrap>
            <SideButton
              selected={location.pathname === "/"}
              icon="/home-2.svg"
              btnClick={moveToMain}
            />
            <SideButton
              selected={
                location.pathname === "/myInfo" ||
                location.pathname === "/space"
              }
              icon="/user-tag.svg"
              btnClick={moveToMyInfo}
            />
            <SideButton icon="/folder-add3.svg" btnClick={openModal} />
            <SideButton
              selected={location.pathname === "/posting/add"}
              icon="/edit2.svg"
              btnClick={moveToPosting}
            />
          </SideButtonWrap>
          {user.nickname !== null && (
            <DeleteButton>
              <SideButton deleteButton icon="/logout.svg" btnClick={logout} />
            </DeleteButton>
          )}
        </>
      )}
    </NavContainer>
  );
}

export default NavigationBar;
