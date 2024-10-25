import React from "react";
import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";

const Border = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  position: relative;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  flex: 1;
`;

const Nickname = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.header};
`;

const Email = styled.div`
  color: ${theme.colors.neutral400};
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const handleFollowDelete = () => {
  if (window.confirm("내 이웃에서 삭제할까요?")) {
    // 이웃 삭제 API 호출
  }
};

function EachFollowComp({ nickname, email, profile }) {
  return (
    <Border>
      <Container>
        <ProfileSection>
          <ImageWrapper>
            <img src={profile} alt="Default Profile" />
          </ImageWrapper>
          <InfoSection>
            <Nickname>{nickname}</Nickname>
            <Email>{email}</Email>
          </InfoSection>
        </ProfileSection>
        <DeleteButton onClick={handleFollowDelete}>
          <DynamicSVG
            svgUrl="/close-circle.svg"
            width={45}
            height={45}
            color={theme.colors.neutral400}
          />
        </DeleteButton>
      </Container>
    </Border>
  );
}

export default EachFollowComp;
