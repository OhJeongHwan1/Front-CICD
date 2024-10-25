import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import SideButton from "./SideButton";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import theme from "../theme";
import { userLogOut } from "../redux/userSlice";
import SpaceAddModal from "./SpaceAddModal";
import LoginModal from "./LoginModal";
import LocationSelectModal from "./LocationSelectModal";

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1000px;
  height: 60px;
  background-color: #fff;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
  z-index: 101;

  &::after {
    content: ""; // 가상 요소에는 content 속성이 필수
    display: ${({ isRegister }) => (isRegister ? "none" : "block")};
    position: relative;
    left: 0;
    bottom: 0px;
    width: 60px;
    height: 100vh;
    background: #fff; // 가벼운 그림자 효과
    filter: drop-shadow(4px 10px 4px rgba(0, 0, 0, 0.1));
  }
`;

const RightWrap = styled.div`
  position: absolute;
  right: 80px;
  top: 12px;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 5;
`;

const SideButtonWrap = styled.div`
  position: absolute;
  width: 45px;
  height: 290px;
  left: 7.5px;
  top: 110px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const NickName = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.regular};
`;

const DeleteButton = styled.div`
  position: absolute;
  left: 7.5px;
  top: 580px;
  z-index: 7;
`;

function NavigationBar() {
  const [spaceModal, setSpaceModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(selectUser);

  useEffect(() => {}, [user]);

  const moveToMain = () => {
    navigate(`/`);
  };
  const moveToMyInfo = () => {
    if (user.userId === null) {
      setLoginModal(true);
    } else {
      navigate(`/myInfo`);
    }
  };
  const openModal = () => {
    if (user.userId === null) {
      setLoginModal(true);
    } else {
      setSpaceModal(true);
    }
  };
  const moveToPosting = () => {
    if (user.userId === null) {
      setLoginModal(true);
    } else {
      navigate(`/posting/add`);
    }
  };

  const logout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      dispatch(userLogOut());
      navigate(`/`);
    }
  };

  const handleClose = () => {
    setSpaceModal(false);
    setLoginModal(false);
  };

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      setSearchQuery("");
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <NavContainer isRegister={location.pathname === "/register"}>
      <div className="flex items-center h-[60px] gap-[70px]">
        <img
          onClick={moveToMain}
          style={{
            margin:
              location.pathname === "/register"
                ? "5px 0 0 5px"
                : "15px 0 0 15px",
            cursor: "pointer",
          }}
          width={45}
          height={45}
          src="/Logo.svg"
          alt=""
        />
        <Input
          value={searchQuery}
          the_type="search"
          placeholder="여행 기록을 검색해보세요!"
          width={`450px`}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <RightWrap>
        {user.userId === null ? (
          <Button width={`110px`} text="로그인" btnClick={openLoginModal} />
        ) : (
          <div
            className="flex items-center gap-[24px] cursor-pointer"
            onClick={moveToMyInfo}
          >
            <ProfileImg alt="/Default Profile.png" src={user.profile} />
            <NickName>{user.nickName}</NickName>
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
          {user.userId !== null && (
            <DeleteButton>
              <SideButton deleteButton icon="/logout.svg" btnClick={logout} />
            </DeleteButton>
          )}
        </>
      )}
      {spaceModal && (
        <SpaceAddModal spaceModal={spaceModal} handleClose={handleClose} />
      )}
      {loginModal && (
        <LoginModal loginModal={loginModal} handleClose={handleClose} />
      )}
    </NavContainer>
  );
}

export default NavigationBar;
