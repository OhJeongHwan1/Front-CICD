import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import AgreementComp from "./template/AgreementComp";
import EmailAuthComp from "./template/EmailAuthComp";
import VerificationComp from "./template/VerificationComp";
import PasswordComp from "./template/PasswordComp";
import NicknameComp from "./template/NicknameComp";
import Button from "../../components/Button";
import icon from "/user-tag.svg";
import { useNavigate } from "react-router";
import LoginModal from "../../components/LoginModal";

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  width: 100%;
  min-height: calc(100vh - 100px);
`;

const UserTagIcon = styled.img`
  z-index: 0;
  position: absolute;
  left: 20%;
  top: 40%;
  width: 160px;
  height: 160px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 50%;
  min-height: 80vh;
  border-radius: ${theme.borderRadius.md};
  margin-right: 30px;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const RegisterTop = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
  padding: 30px 30px 20px 30px;
  border-bottom: 1px solid ${theme.colors.neutral200};

  p {
    margin-left: 3px;
  }
`;

const Dots = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 30px;
`;

const Dot = styled.li`
  display: block;
  width: 10px;
  height: 10px;
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primary : theme.colors.neutral300};
  border-radius: 50%;
  transition: transform 0.3s ease, background-color 0.3s ease;
  transform: ${({ isActive }) =>
    isActive ? "translateY(0)" : "translateY(10px)"};
`;

const RegisterMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  flex-grow: 1;
`;

const RegisterBtns = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 30px 0 10px;
  align-items: center;
  margin-bottom: 30px;
`;

const PrevButton = styled.button`
  width: 134px;
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.neutral400};
  text-align: center;
`;

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [agreement, setAgreement] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleNext = () => setStep((prevStep) => prevStep + 1);

  const isNextBtnDisabled = () => {
    // abc@abc.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 영문 대소문자, 숫자, 특수문자 포함 8자리 이상
    const pwRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    // 한글, 영문 대소문자, 숫자, 띄어쓰기
    const nicknameRegex = /^[가-힣a-zA-Z0-9\s]+$/;
    switch (step) {
      case 0:
        return !agreement;
      case 1:
        return !emailRegex.test(email);
      case 2:
        return !verificationCode; // 인증 코드 검증 로직 필요함.
      case 3:
        return !pwRegex.test(password);
      case 4:
        return !nicknameRegex.test(nickname);
      default:
        return true;
    }
  };

  return (
    <Background>
      <Layout>
        <RegisterSection>
          <RegisterTop>
            <Dots>
              {[...Array(5)].map((_, index) => (
                <Dot key={index} isActive={step === index} />
              ))}
            </Dots>
            <p>{step === 4 ? "거의 다 마무리 됐어요!" : "회원가입"}</p>
          </RegisterTop>
          <RegisterMain>
            {step === 0 && (
              <AgreementComp
                agreement={agreement}
                setAgreement={setAgreement}
              />
            )}
            {step === 1 && <EmailAuthComp email={email} setEmail={setEmail} />}
            {step === 2 && (
              <VerificationComp
                email={email}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
              />
            )}
            {step === 3 && (
              <PasswordComp password={password} setPassword={setPassword} />
            )}
            {step === 4 && (
              <NicknameComp nickname={nickname} setNickname={setNickname} />
            )}
            {step > 4 && navigate("/")}
          </RegisterMain>
          <RegisterBtns>
            <PrevButton onClick={handlePrev}>
              {step === 0 ? "" : "이전"}
            </PrevButton>
            <Button
              text={step === 4 ? "가입 완료" : "다음"}
              className="text-white"
              disabled={isNextBtnDisabled()}
              btnClick={handleNext}
              width={"134px"}
            />
          </RegisterBtns>
        </RegisterSection>
      </Layout>
    </Background>
  );
}

export default Register;
