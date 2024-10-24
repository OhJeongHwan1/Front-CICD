import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../../components/Input";
import theme from "../../../theme";

const GuideText = styled.p`
  color: ${theme.colors.neutral400};
  margin-left: 20px;
  padding-top: 8px;
  font-size: small;
`;

const ErrorText = styled(GuideText)`
  color: ${theme.colors.error};
`;

function PasswordComp({ password, setPassword }) {
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [secondPw, setSecondPw] = useState("");
  const [showMismatchError, setShowMismatchError] = useState(false);

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("password");
    const savedSecondPw = sessionStorage.getItem("secondPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      setSecondPw(savedSecondPw);
    }
  }, []);

  // 비밀번호 형식 검증
  const validatePassword = (password) => {
    const pwRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    return pwRegex.test(password);
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    sessionStorage.setItem("password", newPassword);

    // 유효성 검사
    setInvalidPassword(!validatePassword(newPassword));
  };

  // 두 번째 비밀번호 입력 처리
  const handleReTypeChange = (e) => {
    const newSecondPassword = e.target.value;
    setSecondPw(newSecondPassword);
    sessionStorage.setItem("secondPassword", newSecondPassword);

    // 일치 여부 확인
    setShowMismatchError(password !== newSecondPassword);
  };

  return (
    <div className="flex flex-col">
      <p className="pb-5">비밀번호를 입력해주세요.</p>
      <Input
        the_type={"password"}
        type="password"
        placeholder="비밀번호를 입력하세요."
        maxlength={16}
        value={password}
        onChange={handlePasswordChange}
        error={invalidPassword}
      />
      {invalidPassword ? (
        <ErrorText>
          영문 대소문자, 숫자, 특수문자 포함 8자리 이상 16자리 이하로
          설정해주세요.
        </ErrorText>
      ) : (
        <GuideText>
          영문 대소문자, 숫자, 특수문자 포함 8자리 이상 16자리 이하로
          설정해주세요.
        </GuideText>
      )}

      <div className="mt-7">
        <p className="pb-5">비밀번호를 다시 입력해주세요.</p>
        <Input
          type="password"
          the_type={"password"}
          placeholder="비밀번호를 재입력해주세요."
          maxlength={16}
          value={secondPw}
          onChange={handleReTypeChange}
          error={showMismatchError}
        />
        {showMismatchError && (
          <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
        )}
      </div>
    </div>
  );
}

export default PasswordComp;
