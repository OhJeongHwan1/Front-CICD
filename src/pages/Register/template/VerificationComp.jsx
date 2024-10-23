import React, { useRef, useState, useEffect } from "react";
import theme from "../../../theme";
import styled from "styled-components";

const Highlight = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
`;

const StyledInput = styled.input`
  width: 50px;
  height: 62px;
  text-align: center;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  border: 1px solid ${theme.colors.neutral400};
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  outline: none;
  caret-color: transparent;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 1px ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ErrorText = styled.p`
  color: ${theme.colors.error};
  padding-top: 8px;
  font-size: small;
`;

const TOTAL_INPUTS = 6;

function VerificationComp({ email, verificationCode, setVerificationCode }) {
  const [code, setCode] = useState(Array(TOTAL_INPUTS).fill(""));
  const inputRefs = Array.from({ length: TOTAL_INPUTS }, () => useRef(null));

  // 컴포넌트가 마운트될 때 verificationCode가 있으면 입력 필드에 설정
  useEffect(() => {
    if (verificationCode) {
      const codeArray = verificationCode.split("").slice(0, TOTAL_INPUTS);
      setCode(
        codeArray.concat(Array(TOTAL_INPUTS - codeArray.length).fill(""))
      );
    } else {
      // sessionStorage에서 저장된 코드 확인
      const savedCode = sessionStorage.getItem("verificationCode");
      if (savedCode) {
        const savedCodeArray = savedCode.split("").slice(0, TOTAL_INPUTS);
        setCode(
          savedCodeArray.concat(
            Array(TOTAL_INPUTS - savedCodeArray.length).fill("")
          )
        );
        setVerificationCode(savedCode);
      }
    }
  }, []);

  // code 상태가 변경될 때마다 verificationCode와 sessionStorage 업데이트
  useEffect(() => {
    const codeString = code.join("");
    if (codeString !== verificationCode) {
      setVerificationCode(codeString);
      if (codeString) {
        sessionStorage.setItem("verificationCode", codeString);
      }
    }
  }, [code]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    if (value && index < TOTAL_INPUTS - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, TOTAL_INPUTS);
    const updatedCode = [...code];

    pastedData.split("").forEach((char, index) => {
      if (index < TOTAL_INPUTS) updatedCode[index] = char;
    });

    setCode(updatedCode);
    const focusIndex = Math.min(pastedData.length, TOTAL_INPUTS - 1);
    inputRefs[focusIndex].current?.focus();
  };

  const isCodeIncomplete = () => code.some((c) => !c);

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <Highlight>{email}</Highlight>으로 인증코드를 보내드렸어요! 인증코드를
        입력해주세요.
      </div>

      <div className="flex justify-start gap-2">
        {code.map((value, index) => (
          <StyledInput
            key={index}
            ref={inputRefs[index]}
            the_type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className="flex justify-start">
        {isCodeIncomplete() && <ErrorText>인증 코드를 입력해주세요.</ErrorText>}
      </div>
    </div>
  );
}

export default VerificationComp;
