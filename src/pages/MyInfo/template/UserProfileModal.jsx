import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import CustomModal from "../../../components/CustomModal";
import { useDispatch } from "react-redux";
import { resignAsync, userLogOut } from "../../../redux/userSlice";
import { useNavigate } from "react-router";

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;

  .nickname {
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSizes.lg};
    width: 100px;
    text-align: center;
  }

  .image-container {
    position: relative;
  }

  .image-container:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordTitle = styled.div`
  margin: 30px 0 10px 0;
  .bold {
    font-weight: ${theme.fontWeight.bold};
  }
  .small {
    font-size: ${theme.fontSizes.sm};
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 20px 0;
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  .resignation {
    color: ${theme.colors.error};
    font-weight: bold;
  }
`;

const GuideText = styled.p`
  color: ${theme.colors.neutral400};
  margin-left: 20px;
  font-size: small;
`;

const ErrorText = styled(GuideText)`
  color: ${theme.colors.error};
`;

function UserProfileModal({ isOpen, onClose, profile, email, nickname }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(nickname);
  const [isCurrentPw, setCurrentPw] = useState(false);
  const [firstPw, setFirstPw] = useState("");
  const [secondPw, setSecondPw] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [mismatchError, setmismatchError] = useState(false);

  const handleNicknameChange = (e) => {
    setInputValue(e.target.value);
    onNicknameChange?.(e.target.value);
  };

  const handleResignation = async () => {
    try {
      // 사용자 확인
      if (window.confirm("정말로 탈퇴하시겠습니까?")) {
        const result = await dispatch(resignAsync()).unwrap();
        if (result) {
          dispatch(userLogOut());
          navigate("/");
        }
      }
    } catch (error) {
      // 에러 처리
      console.error("회원 탈퇴에 실패했어요:", error);
    }
  };

  const isPwCorrect = (e) => {
    const currentPassword = sessionStorage.getItem("password");
    if (currentPassword == e.target.value) {
      setCurrentPw(true);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFirstPw(newPassword);

    // 유효성 검사
    setInvalidPassword(!validatePassword(newPassword));
  };

  const handleReTypeChange = (e) => {
    const newSecondPassword = e.target.value;
    setSecondPw(newSecondPassword);

    // 일치 여부 확인
    setmismatchError(firstPw !== newSecondPassword);
  };

  const validatePassword = (password) => {
    const pwRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    return pwRegex.test(password);
  };

  const handleModifyButton = () => {
    if (
      !isCurrentPw ||
      mismatchError ||
      invalidPassword ||
      firstPw === "" ||
      secondPw === ""
    ) {
      alert("정보를 수정할 수 없어요. 다시 확인해주세요.");
    } else {
      // 정보 수정 API
      alert("정보를 수정했습니다.");
    }
  };

  return (
    <CustomModal
      titleIcon={"/user-tag.svg"}
      title={"내 정보 수정"}
      modal={isOpen}
      modalClose={onClose}
      noBottom={true}
    >
      <ProfileSection>
        <div className="image-container">
          <img src={profile} style={{ width: "75px", height: "75px" }} />
        </div>
        <input
          className="nickname"
          required
          value={inputValue}
          maxLength={12}
          style={{ outline: "none" }}
          onChange={handleNicknameChange}
        />
        <div className="email">{email}</div>
      </ProfileSection>
      <PasswordSection>
        <PasswordTitle>
          <div className="bold">비밀번호 수정</div>
          <div className="small">
            영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요.
          </div>
        </PasswordTitle>
        <InputSection>
          <Input
            placeholder={"현재 비밀번호를 입력해주세요."}
            the_type={"password"}
            type="password"
            width={"100%"}
            onChange={isPwCorrect}
          />
          <Input
            placeholder={"새로운 비밀번호를 입력해주세요."}
            the_type={"password"}
            type="password"
            width={"100%"}
            value={firstPw}
            onChange={handlePasswordChange}
            error={invalidPassword}
          />
          {invalidPassword && (
            <ErrorText>
              영문 대소문자, 숫자, 특수문자 포함 8자리 이상 16자리 이하로
              설정해주세요.
            </ErrorText>
          )}
          <Input
            placeholder={"새로운 비밀번호를 한번 더 입력해주세요."}
            the_type={"password"}
            type="password"
            width={"100%"}
            value={secondPw}
            onChange={handleReTypeChange}
            error={mismatchError}
          />
          {mismatchError && (
            <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
          )}
        </InputSection>
      </PasswordSection>
      <ButtonSection>
        <button className="resignation" onClick={handleResignation}>
          회원탈퇴
        </button>
        <Button
          text={"정보 수정"}
          width={"150px"}
          btnClick={handleModifyButton}
        />
      </ButtonSection>
    </CustomModal>
  );
}

export default UserProfileModal;
