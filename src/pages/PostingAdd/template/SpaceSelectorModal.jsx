import CustomModal from "../../../components/CustomModal";

const SpaceSelectorModal = ({ isModal, setIsModal }) => {
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
      하이
    </CustomModal>
  );
};

export default SpaceSelectorModal;
