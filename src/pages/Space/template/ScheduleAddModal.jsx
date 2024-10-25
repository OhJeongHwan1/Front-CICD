import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { selectModal, setScheduleAddModal } from "../../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/Input";
import theme from "../../../theme";
import styled from "styled-components";
import { selectSpace } from "../../../redux/spaceSlice";
import { addScheduleAsync } from "../../../redux/scheduleSlice";

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

const InputArea = ({ title, discription, children }) => {
  return (
    <div className="mb-[20px]">
      <Title>{title}</Title>
      <Discription>{discription}</Discription>
      {children}
    </div>
  );
};

function ScheduleAddModal({ selectDay, loadSpaceSchedule }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { spaceDetail } = useSelector(selectSpace);
  const { scheduleAddModal } = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    dispatch(setScheduleAddModal(false));
  };

  const addSchedule = () => {
    const data = {
      spaceId: spaceDetail.spaceId,
      spot: name,
      memo: description,
      day: selectDay,
    };

    dispatch(addScheduleAsync(data))
      .unwrap()
      .then(() => {
        loadSpaceSchedule();
        alert("추가되었습니다.");
        dispatch(setScheduleAddModal(false));
      });
  };
  return (
    <CustomModal
      modal={scheduleAddModal}
      modalClose={handleClose}
      title="일정 추가하기"
      titleIcon="/edit2.svg"
      btnClick={addSchedule}
      btnText="추가하기"
    >
      <InputArea title="장소" discription="여행할 장소를 입력해주세요.">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          width="100%"
          placeholder="장소명을 입력하세요"
        />
      </InputArea>

      <InputArea title="메모" discription="일정에 대한 메모를 작성해주세요. ">
        <StyledTextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="메모를 입력하세요."
        />
      </InputArea>
    </CustomModal>
  );
}

export default ScheduleAddModal;
