import React from "react";
import CustomModal from "./CustomModal";
import styled from "styled-components";
import theme from "../theme";
import Input from "./Input";

const Title = styled.p`
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.header};
  margin-bottom: 8px;
`;

const Discription = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: 8px;
`;

const MiddleWrapper = styled.div`
  width: 100%;
  display: flex;
  > div {
    width: 50%;
  }
`;

const InputArea = ({ title, discription, children }) => {
  return (
    <div className="mb-[12px]">
      <Title>{title}</Title>
      <Discription>{discription}</Discription>
      {children}
    </div>
  );
};

function SpaceAddModal({ spaceModal, handleClose }) {
  return (
    <CustomModal
      modal={spaceModal}
      modalClose={handleClose}
      title="새로운 스페이스 만들기"
      titleIcon="/folder-add2.svg"
      btnText="생성"
      large
    >
      <InputArea
        title="스페이스 이름"
        discription="이번 여행에 대한 스페이스 이름을 정해주세요. 한글, 영문자, 공백 포함 최대 40자까지 입력할 수 있어요. "
      >
        <Input width="100%" placeholder="스페이스 이름을 입력하세요" />
      </InputArea>
      <InputArea
        title="스페이스 설명(선택)"
        discription="이번 여행에 대한 설명을 입력해주세요. "
      ></InputArea>
      <MiddleWrapper>
        <InputArea
          title="장소 선택"
          discription="이번 여행 장소를 선택해주세요."
        ></InputArea>
        <InputArea
          title="최대 인원 수"
          discription="스페이스 최대 인원 수 제한을 설정해주세요."
        ></InputArea>
      </MiddleWrapper>

      <InputArea
        title="날짜 지정"
        discription="여행 날짜(시작 날짜 / 마지막 날짜)를 선택해주세요."
      ></InputArea>
    </CustomModal>
  );
}

export default SpaceAddModal;
