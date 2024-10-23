import CustomModal from "../../../components/CustomModal";

const SpaceSelectorModal = ({ isModal, setIsModal }) => {
  return (
    <CustomModal
      modal={isModal}
      modalClose={() => setIsModal(!isModal)}
      large={true}
      title="스페이스 선택"
      titleIcon="/folder-add.svg"
      btnText="선택"
      btnDisable={false}
      btnClick={() => {}}
      statusText=""
      noBottom={false}
    >
      하이
    </CustomModal>
  );
};

export default SpaceSelectorModal;
