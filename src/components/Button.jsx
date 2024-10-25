import React from "react";
import styled from "styled-components";
import DynamicSVG from "./DynamicSVG";

const StyledButton = styled.div`
  width: ${({ width }) => (width ? `${width}` : "270px")};
  height: 36px;
  border-radius: 15px;
  padding: 1px;
  background: linear-gradient(0deg, #4a48c9 0%, #6a68f9 50%, #9e9cfb 100%);
  transition: 0.2s;

  > div {
    background-color: #6a68f9;
    border-radius: 15px;
    height: 34px;
    display: flex;
    justify-content: center;
    transition: 0.2s;
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

function Button({ text, type, width, btnClick, disabled, ...props }) {
  const renderText = (text, type) => {
    if (type) {
      if (type === "space")
        return (
          <>
            <DynamicSVG
              svgUrl="/folder-add.svg"
              color={disabled ? `#94A3B8` : "white"}
            />
            <p style={{ color: disabled ? `#94A3B8` : "white" }}>
              {text ? text : `스페이스 생성`}
            </p>
          </>
        );
      if (type === "posting")
        return (
          <>
            <DynamicSVG
              svgUrl="/edit.svg"
              color={disabled ? `#94A3B8` : "white"}
            />
            <p style={{ color: disabled ? `#94A3B8` : "white" }}>
              {text ? text : `포스팅 작성`}
            </p>
          </>
        );
      if (type === "follow")
        return (
          <>
            <DynamicSVG
              svgUrl="/heart.svg"
              color={disabled ? `#94A3B8` : "white"}
            />
            <p style={{ color: disabled ? `#94A3B8` : "white" }}>
              {text ? text : `이웃 추가`}
            </p>
          </>
        );
    } else {
      return <p style={{ color: disabled ? `#94A3B8` : "white" }}>{text}</p>;
    }
  };

  return (
    <StyledButton
      onClick={!disabled && btnClick}
      width={width}
      disabled={disabled}
      {...props}
    >
      <div>
        <TextArea>{renderText(text, type)}</TextArea>
      </div>
    </StyledButton>
  );
}

export default Button;
