import CustomModal from "../../../components/CustomModal";
import SmallSpaceCard from "./SmallSpaceCard";
import styled from "styled-components";

const SpaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SpaceSelectorModal = ({ isModal, setIsModal, setSpace, spaceList }) => {
  return (
    <CustomModal
      modal={isModal}
      modalClose={() => setIsModal(!isModal)}
      title="스페이스 선택"
      titleIcon="/folder-add2.svg"
      btnText="선택"
      btnDisable={false}
      btnClick={() => {}}
      statusText=""
      noBottom={false}
    >
      <SpaceWrapper>
        {spaceList?.map((space) => {
          return (
            <SmallSpaceCard
              space={space}
              setSpace={setSpace}
              setIsModal={setIsModal}
            />
          );
        })}
      </SpaceWrapper>
    </CustomModal>
  );
};

export default SpaceSelectorModal;
