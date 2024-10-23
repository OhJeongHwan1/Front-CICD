import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import Input from "../../../components/Input";

const GuideText = styled.p`
  color: ${theme.colors.neutral400};
  margin-left: 20px;
  padding-top: 8px;
  font-size: small;
`;

function NicknameComp({ nickname, setNickname }) {
  const [isPossibleNickname, setIsPossibleNickname] = useState(false);

  useEffect(() => {
    const savedNickname = sessionStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const validateNickname = (nickname) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9\s]+$/;
    return nicknameRegex.test(nickname);
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    sessionStorage.setItem("nickname", newNickname);

    if (!validateNickname(newNickname)) {
      setIsPossibleNickname(false);
    } else {
      setIsPossibleNickname(true);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="pb-5">닉네임을 입력해주세요.</p>
      <Input
        the_type={"user"}
        placeholder={"닉네임을 입력하세요."}
        maxlength={12}
        value={nickname}
        onChange={handleNicknameChange}
      />
      <GuideText>
        한글, 영문 대소문자, 숫자, 띄어쓰기를 사용할 수 있어요.
      </GuideText>
    </div>
  );
}

export default NicknameComp;
