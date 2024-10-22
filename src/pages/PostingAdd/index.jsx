import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import Button from "../../components/Button";
import DynamicSVG from "../../components/DynamicSVG";
import CustomEditor from "./template/CustomEditor";

const PostingAddContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditorContainer = styled.div`
  margin-top: 30px;
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
  width: 800px;
  min-height: calc(100vh - 30px);
  background: ${theme.colors.white};
`;

const EditorHeader = styled.div`
  padding: 80px 80px 40px 60px;
`;

const SpaceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Space = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
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
  const [isLockBtnHovered, setIsLockBtnHovered] = useState(false);
  const [isLockBtnClicked, setIsLockBtnClicked] = useState(false);
  const [isLock, setIsLock] = useState(false);

  const handleSave = (content) => {
    // 저장 로직 구현
    console.log(content);
  };

  return (
    <PostingAddContainer>
      <EditorContainer>
        <EditorHeader>
          <SpaceArea>
            <Space>스페이스를 선택하세요</Space>
            <Location>
              <DynamicSVG
                svgUrl="/location.svg"
                color={theme.colors.neutral400}
              />
              City, Nation
            </Location>
          </SpaceArea>
          <TitleArea>
            <TitleInput placeholder="제목을 입력하세요." />
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
        </EditorHeader>
        <CustomEditor onSave={handleSave} />
      </EditorContainer>
      <SubmitContainer>
        <CancelButton>취소</CancelButton>
        <Button type="posting" width="140px" text="작성완료" />
      </SubmitContainer>
    </PostingAddContainer>
  );
}

export default PostingAdd;
