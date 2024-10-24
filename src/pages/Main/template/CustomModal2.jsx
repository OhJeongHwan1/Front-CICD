import React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import theme from "../../../theme.js";
import Button from "../../../components/Button.jsx";
import DynamicSVG from "../../../components/DynamicSVG.jsx";

const Container = styled.div`
  width: ${({ large }) => (large ? `800px` : `550px`)};
  min-width: ${({ large }) => (large ? `800px` : `550px`)};
  position: relative;
`;

const TitleArea = styled.div`
  height: 100px;
  width: ${({ large }) => (large ? `800px` : `550px`)};
  min-width: ${({ large }) => (large ? `800px` : `550px`)};
  padding: 0 40px;
  position: fixed;
  border-bottom: 1px solid ${theme.colors.neutral200};

  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  z-index: 9999;
`;

const ContentArea = styled.div`
  margin-top: 100px;
  max-height: 400px;
  padding: 28px 36px;
  overflow-y: auto;
  background-color: #fff;
  ${({ noBottom }) => noBottom && `border-radius: 0 0 30px 30px;`}

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 241, 255, 0.8);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: arent;
    border-radius: 5px;
    margin: 5px 0;
  }
`;

const BottomArea = styled.div`
  border-radius: 0 0 30px 30px;
  padding: 0px 36px;
  height: 120px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid ${theme.colors.neutral200};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StatusMessage = styled.p`
  position: absolute;
  top: 10px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
`;

const CloseButton = styled.div`
  position: absolute;
  right: 36px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

function CustomModal2({
  modal,
  modalClose,
  large,
  title,
  titleIcon,
  btnText,
  btnDisable,
  btnClick,
  statusText,
  noBottom,
  children,
}) {
  return (
    <Modal
      open={modal}
      onClose={modalClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        border: "none",
        backgroundColor: "none",
        "& > *": {
          borderRadius: "1px",
          outline: "none",
        },
      }}
    >
      <Container large={large}>
        <TitleArea large={large}>
          <DynamicSVG
            svgUrl={titleIcon}
            color={theme.colors.neutral700}
            width={32}
            height={32}
          />
          <div>{title}</div>
          <CloseButton onClick={modalClose}>
            <img src="/close-circle.svg" alt="" />
          </CloseButton>
        </TitleArea>
        <ContentArea noBottom={noBottom}>{children}</ContentArea>
        {!noBottom && (
          <BottomArea>
            <Button
              width={large ? `728px` : `478px`}
              text={btnText}
              btnClick={btnClick}
              disabled={btnDisable}
            ></Button>
            <StatusMessage>{statusText}</StatusMessage>
          </BottomArea>
        )}
      </Container>
    </Modal>
  );
}

export default CustomModal2;
