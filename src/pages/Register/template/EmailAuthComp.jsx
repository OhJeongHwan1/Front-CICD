import React, { useEffect, useState } from "react";
import theme from "../../../theme";
import Input from "../../../components/Input";

function EmailAuthComp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
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

    localStorage.setItem("email", newEmail);

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
        type={"sms"}
        placeholder={"이메일을 입력하세요."}
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && (
        <p style={{ color: `${theme.colors.error}` }}>
          이메일 양식이 틀려요! 다시 입력해주세요.
        </p>
      )}
    </div>
  );
}

export default EmailAuthComp;
