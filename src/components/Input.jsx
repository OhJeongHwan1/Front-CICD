import React from "react";
import styled from "styled-components";

const TYPES = ["search", "sms", "password", "user"];

const StyledInput = styled.input`
  width: ${({ width }) => (width ? `${width}` : `500px`)};
  height: 60px;
  flex-shrink: 0;
  padding-left: ${({ the_type }) =>
    TYPES.some((t) => t === the_type) ? "68px" : "34px"};
  border-radius: 100px;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
  outline: none;
  border: 1px solid transparent;
  background: #f1f5f9;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;
  transition: 0.3s;

  ${({ center }) => center && `text-align: center; padding-left: 0px;`}

  ${({ error }) => {
    error &&
      `border: 1px solid var(--error, #EF4444);  &:focus {
    border: 1px solid var(--primary,  #EF4444);
  }`;
  }}

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border: 1px solid var(--primary, #6a68f9);
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 18px;
  left: 24px;
`;

function Input({ width, type, placeholder, center, error, ...props }) {
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
        the_type={type}
        width={width}
        placeholder={placeholder}
        center={center}
        error={error}
        {...props}
      ></StyledInput>
      {renderIcon(type)}
    </div>
  );
}

export default Input;
