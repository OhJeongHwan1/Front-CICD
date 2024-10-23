import React, { useEffect, useState } from "react";
import theme from "../../../theme";
import Input from "../../../components/Input";
import styled from "styled-components";

const ErrorText = styled.p`
  color: ${theme.colors.error};
  margin-left: 20px;
  padding-top: 8px;
  font-size: small;
`;

function EmailAuthComp({ email, setEmail }) {
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    sessionStorage.setItem("email", newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="pb-7">
        사용 가능한 본인의 이메일을 입력해주세요. 해당 이메일로 인증 코드를
        보내드릴게요.
      </p>
      <Input
        the_type={"sms"}
        error={emailError}
        placeholder={"이메일을 입력하세요."}
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && (
        <ErrorText>이메일 양식이 아니에요! 다시 입력해주세요.</ErrorText>
      )}
    </div>
  );
}

export default EmailAuthComp;
