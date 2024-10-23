import React from "react";
import styled from "styled-components";

const TYPES = ["search", "sms", "password", "user"];

const StyledInput = styled.input`
  width: ${({ width }) => (width ? `${width}` : `500px`)};
  height: 45px;
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

  &:focus {
    border: 1px solid var(--primary, #6a68f9);
  }

  ${({ center }) => center && `text-align: center; padding-left: 0px;`}

  ${({ error }) =>
    error &&
    `border: 1px solid var(--error, #ef4444);
      &:focus {
        border: 1px solid var(--primary, #ef4444);
      }
    `}

  &::placeholder {
    color: #94a3b8;
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 11px;
  left: 24px;
`;

function Input({ width, the_type, placeholder, center, error, ...props }) {
  const renderIcon = (the_type) => {
    if (the_type) {
      let path = "";
      if (the_type === "search") path = "/search-status.svg";
      if (the_type === "sms") path = "/sms.svg";
      if (the_type === "password") path = "/password-check.svg";
      if (the_type === "user") path = "/user-edit.svg";

      return <Icon src={path} alt="" />;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        the_type={the_type}
        width={width}
        placeholder={placeholder}
        center={center}
        error={error}
        {...props}
      ></StyledInput>
      {renderIcon(the_type)}
    </div>
  );
}

export default Input;
