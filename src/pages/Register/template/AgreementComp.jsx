import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../../theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Highlight = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
`;

const AllAgree = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.neutral700};
  color: #fff;
  width: 100%;
  height: 77px;
  padding: 30px;
  border-radius: ${theme.borderRadius.md};
`;

const AgreementTitle = styled.div`
  display: flex;
  padding: 30px;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.neutral700};
  justify-content: space-between;

  span {
    margin-left: 20px;
  }
  p {
    font-size: ${theme.fontSizes.md};
    text-decoration: underline;
  }
  p:hover {
    cursor: pointer;
  }

  @media (max-width: 1280px) {
    font-size: ${theme.fontSizes.md};
  }
`;

const AgreementContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 0 30px 0 30px;
  color: ${theme.colors.neutral500} !important;
`;

function AgreementComp() {
  const [isContentVisible, setContentVisible] = useState(false);

  const toggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  return (
    <Container>
      <div style={{ marginBottom: "30px" }}>
        <Highlight>떠나기록</Highlight> 가입을 위해 먼저 가입 및 정보 제공에
        동의해주세요.
      </div>
      <AllAgree>
        <label className="checkbox">
          <input type="checkbox" id="all-checkbox" />
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "20px",
              color: `${theme.colors.neutral50}`,
              fontSize: `${theme.fontSizes.lg}`,
            }}
          >
            전체 동의
          </span>
        </label>
      </AllAgree>
      <AgreementTitle>
        <label>
          <input type="checkbox" id="terms" />
          <span>서비스 이용약관 동의</span>
        </label>
        <p onClick={toggleContent}>{isContentVisible ? "접기" : "펼치기"}</p>
      </AgreementTitle>
      <AgreementContent isOpen={isContentVisible}>
        <p>
          본 서비스 이용약관은 다음과 같은 내용을 담고 있습니다.<br></br>본
          서비스 및 제품(이하 ‘떠나기록’)을 이용해 주셔서 감사합니다. 본 약관은
          다양한 서비스의 이용과 관련하여 서비스를 제공하는 떠나기록
          주식회사(이하 ‘떠나기록’)과 이를 이용하는 떠나기록 서비스 회원(이하
          ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 떠나기록
          서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
        </p>
      </AgreementContent>
      <AgreementTitle>
        <label>
          <input type="checkbox" id="privacy" />
          <span>(필수) 개인정보 수집 및 이용동의</span>
        </label>
        <p onClick={toggleContent}>{isContentVisible ? "접기" : "펼치기"}</p>
      </AgreementTitle>
      <AgreementTitle>
        <label>
          <input type="checkbox" id="thirdParty" />
          <span>(필수) 개인정보 제3자 제공동의서</span>
        </label>
        <p onClick={toggleContent}>{isContentVisible ? "접기" : "펼치기"}</p>
      </AgreementTitle>
      <div className="flex justify-end"></div>
    </Container>
  );
}

export default AgreementComp;
