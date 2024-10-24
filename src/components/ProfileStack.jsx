import styled from "styled-components";

const ProfileStackContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.borderColor || "white"};
  margin-left: -8px; // -ml-2 와 동일

  &:first-child {
    margin-left: 0;
  }
`;

const ProfileStack = ({
  profileList,
  size = 24,
  borderColor = "white",
  ...props
}) => {
  return (
    <ProfileStackContainer {...props}>
      {profileList?.slice(0, 3).map((profileUrl, index) => (
        <ProfileImage
          key={index}
          src={profileUrl}
          size={size}
          borderColor={borderColor}
          style={{ zIndex: profileList.length - index }}
        />
      ))}
      {profileList?.length > 3 && (
        <div
          className="flex items-center justify-center -ml-1"
          style={{ width: size, height: size }}
        >
          <span className="text-xs text-gray-500 font-bold">
            +{profileList?.length - 3}
          </span>
        </div>
      )}
    </ProfileStackContainer>
  );
};

export default ProfileStack;
