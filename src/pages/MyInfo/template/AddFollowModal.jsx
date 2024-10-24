import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import styled from "styled-components";
import Input from "../../../components/Input";
import theme from "../../../theme";

const UserProfile = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 10px 25px 10px 25px;
  background-color: ${theme.colors.neutral100};
  border-radius: ${theme.borderRadius.md};
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
`;

const Nickname = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

function AddFollowModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isMatched, setMatched] = useState(false);

  const handleAddFollowChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddFollowBtn = () => {
    // 입력 받은 이메일과 받아온 유저 검색 API 값이 같으면 프로필을 표시한다.
    if (email == res) {
      setMatched(true);
      // 이웃 추가 API
    }
  };

  return (
    <CustomModal
      titleIcon={"/user-cirlce-add.svg"}
      title={"이웃 추가"}
      modal={isOpen}
      modalClose={onClose}
      btnText={"이웃 추가하기"}
      btnClick={handleAddFollowBtn}
    >
      <Input
        placeholder={"이메일을 입력하세요."}
        width={"100%"}
        the_type={"sms"}
        onChange={handleAddFollowChange}
      ></Input>
      {isMatched && (
        <UserProfile>
          <img src="/Default Profile.png" alt="/Default Profile.png"></img>
          <div className="flex flex-col justify-center gap-1 ml-5">
            <Nickname>검색한 닉네임</Nickname>
            <Email>검색한 이메일</Email>
          </div>
        </UserProfile>
      )}
    </CustomModal>
  );
}

export default AddFollowModal;
