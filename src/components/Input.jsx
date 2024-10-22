import React from "react";
import styled from "styled-components";

const TYPES = ["search", "sms", "password", "user"];

const StyledInput = styled.input`
  width: ${({ width }) => (width ? `${width}px` : `500px`)};
  height: 60px;
  flex-shrink: 0;
  padding-left: 68px;
  border-radius: 100px;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
  outline: none;
  border-width: 0;
  background: #f1f5f9;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 18px;
  left: 24px;
`;

function Input({ width, type, placeholder, ...props }) {
  const renderIcon = (type) => {
    if (type) {
      let path = "";
      if (type === "search") path = "/search-status.svg";
      if (type === "sms") path = "/sms.svg";
      if (type === "password") path = "/password-check.svg";
      if (type === "user") path = "/user-edit.svg";

      return <Icon src={path} alt="" />;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        width={width}
        placeholder={placeholder}
        {...props}
      ></StyledInput>
      {renderIcon(type)}
    </div>
  );
}

export default Input;
