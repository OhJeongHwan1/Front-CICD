import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import { Checkbox, FormControlLabel } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Highlight = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
`;

const AllAgreements = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.primary};
  color: #fff;
  width: 100%;
  height: 57px;
  padding: 30px;
  font-size: ${theme.fontSizes.lg};
  font-weight: bold;
  border-radius: ${theme.borderRadius.md};
`;

const AgreementTitle = styled.div`
  display: flex;
  padding: 20px;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.neutral700};
  justify-content: space-between;
  margin-left: 15px;

  span {
    font-size: ${theme.fontSizes.lg};
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
  font-size: small;
`;

function AgreementComp({ agreement, setAgreement }) {
  const [isContentVisible, setContentVisible] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
  });

  const toggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  // 전체 동의 체크 시 모든 항목 체크 처리한다.
  const handleAllAgreements = (e) => {
    const checked = e.target.checked;
    setCheckboxes({
      terms: checked,
      privacy: checked,
      thirdParty: checked,
    });

    if (checked) {
      setAgreement(true);
    } else {
      setAgreement(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // 모든 체크박스가 체크되면 전체 동의 체크박스도 자동으로 체크될 수 있게 한다.
  useEffect(() => {
    const allChecked =
      checkboxes.terms && checkboxes.privacy && checkboxes.thirdParty;

    setAgreement(allChecked);
  }, [checkboxes, setAgreement]);

  return (
    <Container>
      <div style={{ marginBottom: "20px" }}>
        <Highlight>떠나기록</Highlight> 가입을 위해 먼저 가입 및 정보 제공에
        동의해주세요.
      </div>
      <AllAgreements>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreement}
              onChange={handleAllAgreements}
              name="all-checkbox"
            />
          }
          label={
            <span className="text-white text-xl font-bold">전체 동의</span>
          }
        />
      </AllAgreements>
      <AgreementTitle>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.terms}
              onChange={handleCheckboxChange}
              id="terms"
              size="small"
            />
          }
          label={<span>서비스 이용약관 동의</span>}
        />
        <p onClick={toggleContent}>{isContentVisible ? "접기" : "펼치기"}</p>
      </AgreementTitle>
      <AgreementContent isOpen={isContentVisible}>
        <p>
          본 서비스 및 제품(이하 ‘떠나기록’)을 이용해 주셔서 감사합니다. 본
          약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 떠나기록
          주식회사(이하 ‘떠나기록’)과 이를 이용하는 떠나기록 서비스 회원(이하
          ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 떠나기록
          서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
        </p>
      </AgreementContent>
      <AgreementTitle>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.privacy}
              onChange={handleCheckboxChange}
              id="privacy"
              size="small"
            />
          }
          label={<span>(필수) 개인정보 수집 및 이용동의</span>}
        />
      </AgreementTitle>
      <AgreementTitle style={{ paddingBottom: 0 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes.thirdParty}
              onChange={handleCheckboxChange}
              id="thirdParty"
              size="small"
            />
          }
          label={<span>(필수) 개인정보 제3자 제공동의서</span>}
        />
      </AgreementTitle>
      <div className="flex justify-end"></div>
    </Container>
  );
}

export default AgreementComp;
