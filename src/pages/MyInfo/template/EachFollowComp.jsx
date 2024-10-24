import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";

const Border = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

const handleFollowDelete = () => {
  if (window.confirm("정말로 삭제하실 건가요?")) {
    // 이웃 삭제 API 호출
  }
};

function EachFollowComp({ nickname, email }) {
  return (
    <Border>
      <div className="flex justify-center items-center pl-7 pr-7 pt-4 pb-4">
        <div className="flex justify-center items-center">
          <img
            src={"./Default Profile4.png"}
            style={{ minWidth: "60px", height: "60px" }}
            alt="./Default Profile.png"
          />
        </div>
        <div className="flex flex-col ml-7">
          <Nickname>{nickname}</Nickname>
          <Email>{email}</Email>
        </div>
        <button onClick={handleFollowDelete}>
          <DynamicSVG
            className="ml-4 pr-5"
            svgUrl={"/close-circle.svg"}
            width={45}
            height={45}
            color={`${theme.colors.neutral400}`}
          />
        </button>
      </div>
    </Border>
  );
}

export default EachFollowComp;
