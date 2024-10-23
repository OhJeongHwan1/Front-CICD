import React from "react";
import styled from "styled-components";
import theme from "../theme";

const StyledButton = styled.div`
  width: ${({ width }) => (width ? `${width}` : "270px")};
  height: 36px;
  border-radius: 15px;
  padding: 1px;
  background: linear-gradient(0deg, #1e293b 0%, #475569 50%, #9994b8 100%);
  transition: 0.2s;

  > div {
    background-color: ${theme.colors.neutral600};
    border-radius: 15px;
    height: 34px;
    display: flex;
    justify-content: center;
    transition: 0.2s;
  }

  &:hover {
    > div {
      background-color: ${theme.colors.neutral700};
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
  line-height: 36px;
`;

function EditButton({ text, width, btnClick, disabled, ...props }) {
  return (
    <StyledButton
      onClick={!disabled && btnClick}
      width={width}
      disabled={disabled}
      {...props}
    >
      <div style={{ color: disabled ? `#94A3B8` : "white" }}>{text}</div>
    </StyledButton>
  );
}

export default EditButton;
