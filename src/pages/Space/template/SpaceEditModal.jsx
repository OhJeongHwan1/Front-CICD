import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal";
import styled from "styled-components";
import theme from "../../../theme";
import Input from "../../../components/Input";
import SelectedButton from "../../../components/SelectedButton";
import DynamicSVG from "../../../components/DynamicSVG";
import CustomDatePicker from "../../../components/CustomDatePicker";
import { formatDate } from "../../../time";
import { useSelector, useDispatch } from "react-redux";
import { selectModal, setSpaceEditModal } from "../../../redux/modalSlice";
import { editSpaceAsync } from "../../../redux/spaceSlice";

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

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 20px 34px;
  background: #f1f5f9;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 25px;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
  transition: 0.2s;
  outline: none;
  resize: none;

  &:focus {
    border: 1px solid var(--primary, #6a68f9);
  }

  ${({ error }) =>
    error &&
    `border: 1px solid var(--error, #ef4444);
      &:focus {
        border: 1px solid var(--primary, #ef4444);
      }
    `}

  &::placeholder {
    color: #94a3b8;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(232, 232, 245, 0.9);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 5px 0;
  }
`;

const MembersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
`;

const Members = styled.p`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
`;

const InputArea = ({ title, discription, children }) => {
  return (
    <div className="mb-[20px]">
      <Title>{title}</Title>
      <Discription>{discription}</Discription>
      {children}
    </div>
  );
};

function SpaceEditModal({ spaceDetail, reload }) {
  const [name, setName] = useState(spaceDetail.spaceName);
  const [description, setDescription] = useState(spaceDetail.description);
  const [memberNum, setMemberNum] = useState(spaceDetail.maxMembers);
  const [locate, setLocate] = useState({
    nation: spaceDetail.nationCode,
    city: spaceDetail.cityCode,
  });
  const [startDate, setStartDate] = useState(new Date(spaceDetail.startDate));
  const [endDate, setEndDate] = useState(new Date(spaceDetail.endDate));
  const { spaceEditModal } = useSelector(selectModal);
  const dispatch = useDispatch();

  const spaceAddButtonClick = () => {
    const data = {
      spaceId: spaceDetail.spaceId,
      spaceName: name,
      description: description,
      maxMembers: memberNum,
      nationCode: locate.nation,
      cityCode: locate.city,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    dispatch(editSpaceAsync(data))
      .unwrap()
      .then(() => {
        reload();
        alert("수정되었습니다.");
        dispatch(setSpaceEditModal(false));
      });
  };

  const handleClose = () => {
    dispatch(setSpaceEditModal(false));
  };

  return (
    <CustomModal
      modal={spaceEditModal}
      modalClose={handleClose}
      title="스페이스 수정하기"
      titleIcon="/edit2.svg"
      btnText="수정"
      btnClick={spaceAddButtonClick}
      large
    >
      <InputArea
        title="스페이스 이름"
        discription="이번 여행에 대한 스페이스 이름을 정해주세요. 한글, 영문자, 공백 포함 최대 40자까지 입력할 수 있어요. "
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          width="100%"
          placeholder="스페이스 이름을 입력하세요"
        />
      </InputArea>
      <InputArea
        title="스페이스 설명(선택)"
        discription="이번 여행에 대한 설명을 입력해주세요. "
      >
        <StyledTextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="스페이스 설명을 입력하세요."
        />
      </InputArea>
      <MiddleWrapper>
        <InputArea
          title="장소 선택"
          discription="이번 여행 장소를 선택해주세요."
        >
          <SelectedButton
            setLocate={setLocate}
            locate={locate}
            width="280px"
            color={theme.colors.neutral100}
          />
        </InputArea>
        <InputArea
          title="최대 인원 수"
          discription="스페이스 최대 인원 수 제한을 설정해주세요."
        >
          <MembersWrapper>
            <DynamicSVG
              svgUrl="/arrow-left.svg"
              color={
                memberNum > 1
                  ? theme.colors.neutral400
                  : theme.colors.neutral200
              }
              style={{ cursor: memberNum > 1 && "pointer" }}
              onClick={() => setMemberNum((p) => (memberNum > 1 ? p - 1 : p))}
            />
            <Members>{memberNum}</Members>
            <DynamicSVG
              svgUrl="/arrow-right.svg"
              color={theme.colors.neutral400}
              style={{ cursor: "pointer" }}
              onClick={() => setMemberNum((p) => p + 1)}
            />
          </MembersWrapper>
        </InputArea>
      </MiddleWrapper>

      <InputArea
        title="날짜 지정"
        discription="여행 날짜(시작 날짜 / 마지막 날짜)를 선택해주세요."
      >
        <CustomDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </InputArea>
    </CustomModal>
  );
}

export default SpaceEditModal;
