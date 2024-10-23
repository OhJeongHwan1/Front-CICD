import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme";
import DynamicSVG from "./DynamicSVG";

const Button = styled.button`
  position: fixed;
  bottom: 40px;
  right: 80px;
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral600};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$visible ? "0" : "20px")});
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    background-color: ${theme.colors.neutral700};
    transform: ${(props) => (props.$visible ? "translateY(-4px)" : "20px")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TopButton = ({ showAt = 200 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY > showAt);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button onClick={scrollToTop} $visible={visible} aria-label="Scroll to top">
      <DynamicSVG
        svgUrl="/arrow-up.svg"
        color={theme.colors.neutral50}
        width={28}
        height={28}
      />
    </Button>
  );
};

export default TopButton;
