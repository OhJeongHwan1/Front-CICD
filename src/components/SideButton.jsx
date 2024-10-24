import React from "react";
import styled from "styled-components";
import theme from "../theme";
import DynamicSVG from "./DynamicSVG";

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 15px;
  background-color: ${({ selected }) =>
    !selected ? ` ${theme.colors.neutral200}` : `${theme.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  ${({ selected }) => (!selected ? `cursor: pointer;` : "")};

  &:hover {
    ${(prop) => {
      if (prop.deleteButton) return `background-color:${theme.colors.error}`;
      else if (prop.selected) return "";
      else if (!prop.selected)
        return `background-color:${theme.colors.neutral300}`;
    }};
  }
`;

function SideButton({ icon, btnClick, selected, deleteButton }) {
  return (
    <Wrapper
      onClick={!selected && btnClick}
      selected={selected}
      deleteButton={deleteButton}
    >
      <DynamicSVG
        svgUrl={icon}
        color={
          selected || deleteButton
            ? theme.colors.neutral100
            : theme.colors.neutral400
        }
      />
    </Wrapper>
  );
}

export default SideButton;
