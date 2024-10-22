import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "270px")};
  height: 48px;
  border-radius: 15px;
  padding: 1px;
  background: linear-gradient(0deg, #4a48c9 0%, #6a68f9 50%, #9e9cfb 100%);

  > div {
    background-color: #6a68f9;
    border-radius: 15px;
    height: 46px;
    display: flex;
    justify-content: center;
  }

  &:hover {
    background: linear-gradient(0deg, #9e9cfb 0%, #6a68f9 50%, #4a48c9 100%);
    > div {
      background-color: #4a48c9;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `background: #CBD5E1; > div {
      background-color: #CBD5E1;
      color: #94A3B8;
    }
    &:hover {
    background: #CBD5E1; > div {
      background-color: #CBD5E1;
      color: #94A3B8;
    }
  }
    `}

  cursor: ${({ disabled }) => (disabled ? `` : `pointer`)};
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

function Button({ text, type, width, btnClick, disabled }) {
  const renderText = (text, type) => {
    if (type) {
      if (type === "space")
        return (
          <>
            <img src="/folder-add.svg" />
            <p>{text ? text : `스페이스 생성`}</p>
          </>
        );
      if (type === "posting")
        return (
          <>
            <img src="/edit.svg" />
            <p>{text ? text : `게시글 쓰기`}</p>
          </>
        );
      if (type === "follow")
        return (
          <>
            <img src="/heart.svg" />
            <p>{text ? text : `이웃 추가`}</p>
          </>
        );
    } else {
      return text;
    }
  };

  return (
    <StyledButton
      onClick={!disabled && btnClick}
      width={width}
      disabled={disabled}
    >
      <div>
        <TextArea>{renderText(text, type)}</TextArea>
      </div>
    </StyledButton>
  );
}

export default Button;
