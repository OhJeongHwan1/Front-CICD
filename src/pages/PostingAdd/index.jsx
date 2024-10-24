import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import Button from "../../components/Button";
import CustomEditor from "./template/CustomEditor";
import SchedulePicker from "./template/ScheduleSelector";
import SpaceSelector from "./template/SpaceSelector";

const PostingAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  position: fixed;
  z-index: -2;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Background2 = styled.div`
  background-color: ${theme.colors.white};
  position: fixed;
  bottom: 100px;
  z-index: -1;
  width: 800px;
  height: 600px;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
  width: 800px;
  min-height: calc(100vh - 30px);
  background: ${theme.colors.white};
`;

const EditorHeader = styled.div`
  padding: 80px 80px 20px 60px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 600px;
  height: 60px;
  padding: 0 20px;
  flex-shrink: 0;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  outline: none;
`;

const LockButton = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  padding: 10px 20px;
  cursor: pointer;
`;

const SubmitContainer = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px 0 60px;
  position: fixed;
  top: calc(100vh - 80px);
  height: 80px;
  width: 800px;
  border-top: 1px solid ${theme.colors.neutral200};
  background: ${theme.colors.white};
`;

const CancelButton = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral400};
  cursor: pointer;
  padding: 10px 20px;
  transition: 200ms;

  &:hover {
    color: ${theme.colors.neutral700};
  }
`;

function PostingAdd() {
  // 저장되어야 할 데이터
  const [space, setSpace] = useState({}); // spaceId, name, city, nation
  const [title, setTitle] = useState("");
  const [isLock, setIsLock] = useState(false);
  const [schedule, setSchdule] = useState({}); // sheduleId, date, spot, memo
  const [mainImg, setMainImg] = useState("https://i.imgur.com/0TIs0vO.png");
  const [content, setContent] = useState("");

  // state
  const [isLockBtnHovered, setIsLockBtnHovered] = useState(false);
  const [isLockBtnClicked, setIsLockBtnClicked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // 버튼 활성화 조건
  useEffect(() => {
    const isSpaceValid =
      space.spaceId && space.name && space.city && space.nation;
    const isScheduleValid =
      schedule.scheduleId && schedule.date && schedule.spot;
    const isTitleValid = title.trim() !== "";
    const isContentValid = content.trim() !== "";

    setIsValid(
      isSpaceValid && isScheduleValid && isTitleValid && isContentValid
    );
  }, [space, schedule, title, content]);

  const handleSave = () => {
    const data = {
      spaceId: space.id,
      title: title,
      accessLevel: isLock ? "MEMBER_ONLY" : "PUBLIC",
      scheduleId: schedule.id,
      mainImg: mainImg,
      content: content,
    };

    console.log(data);
  };

  return (
    <PostingAddContainer>
      <EditorContainer>
        <EditorHeader>
          <SpaceSelector setSpace={setSpace} />
          <TitleArea>
            <TitleInput
              placeholder="제목을 입력하세요."
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LockButton
              onMouseEnter={() => setIsLockBtnHovered(true)}
              onMouseLeave={() => setIsLockBtnHovered(false)}
              onMouseDown={() => setIsLockBtnClicked(true)}
              onMouseUp={() => setIsLockBtnClicked(false)}
              onClick={() => setIsLock(!isLock)}
            >
              {isLock ? (
                <>
                  <img
                    src="/lock2.svg"
                    alt="Default"
                    className={`absolute top-0 left-0 transition-transform ease-in-out
        ${isLockBtnClicked ? "scale-90" : "scale-100"}`}
                  />
                </>
              ) : (
                <>
                  <img
                    src="/lock.svg"
                    alt="Default"
                    className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out
        ${isLockBtnHovered ? "opacity-0" : "opacity-100"} ${
                      isLockBtnClicked ? "scale-90" : "scale-100"
                    }`}
                  />

                  <img
                    src="/lock2.svg"
                    alt="Hover"
                    className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out
        ${isLockBtnHovered ? "opacity-100" : "opacity-0"} ${
                      isLockBtnClicked ? "scale-90" : "scale-100"
                    }`}
                  />
                </>
              )}
            </LockButton>
          </TitleArea>
          <SchedulePicker />
        </EditorHeader>
        <CustomEditor setContent={setContent} />
      </EditorContainer>
      <SubmitContainer>
        <CancelButton>취소</CancelButton>
        <Button
          type="posting"
          width="120px"
          text="작성완료"
          // disabled={!isValid}
          onClick={handleSave}
        />
      </SubmitContainer>
      <Background />
      <Background2 />
    </PostingAddContainer>
  );
}

export default PostingAdd;
