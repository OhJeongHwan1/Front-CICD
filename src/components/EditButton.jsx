import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "270px")};
  height: 48px;
  border-radius: 15px;
  padding: 1px;
  background: linear-gradient(0deg, #1e293b 0%, #475569 50%, #9994b8 100%);

  > div {
    background-color: #475569;
    border-radius: 15px;
    height: 46px;
    display: flex;
    justify-content: center;
  }

  &:hover {
    opacity: 0.9;
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
  line-height: 48px;
`;

function EditButton({ text, width, btnClick, disabled }) {
  return (
    <StyledButton
      onClick={!disabled && btnClick}
      width={width}
      disabled={disabled}
    >
      <div>{text}</div>
    </StyledButton>
  );
}

export default EditButton;
