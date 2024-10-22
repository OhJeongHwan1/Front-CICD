import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import AgreementComp from "./template/AgreementComp";
import EmailAuthComp from "./template/EmailAuthComp";
import Button from "../../components/Button";

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  width: 100%;
  height: 100%;
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
  height: 100%;
  border-radius: ${theme.borderRadius.md};
  margin: 60px;

  @media (max-width: 1280px) {
    width: 100%;
    margin: 50px;
  }
`;

const RegisterTop = styled.div`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
  padding: 30px;
  border-bottom: 1px solid ${theme.colors.neutral200};
`;

const RegisterMain = styled.div`
  padding: 30px;
`;

const PrevButton = styled.button`
  width: 134px;
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.neutral400};
  text-align: center;
`;

function Register() {
  let [nextContent, setNextContent] = useState(0);

  const handlePrevContent = () => {
    setNextContent((prev) => Math.max(prev - 1, 0));
  };

  const handleNextContent = () => {
    setNextContent(nextContent++);
  };

  return (
    <>
      <Background>
        <Layout>
          <RegisterSection>
            <RegisterTop>회원가입</RegisterTop>
            <RegisterMain>
              {nextContent === 0 && <AgreementComp />}
              {nextContent === 1 && <EmailAuthComp />}
            </RegisterMain>
            <div className="flex justify-between p-7">
              <PrevButton onClick={handlePrevContent}>이전</PrevButton>
              <Button
                text="다음"
                className="text-white"
                btnClick={handleNextContent}
                width={134}
              />
            </div>
          </RegisterSection>
        </Layout>
      </Background>
    </>
  );
}

export default Register;
