import React from "react";
import CustomModal from "../../../components/CustomModal";
import { useSelector, useDispatch } from "react-redux";
import {
  selectModal,
  setDateEditModal,
  setMemberInviteModal,
} from "../../../redux/modalSlice";

function DateEditModal({ startDate, endDate }) {
  const { dateEditModal } = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDateEditModal(false));
  };

  return (
    // 구현중
    <CustomModal
      title="날짜 수정"
      titleIcon="/calendar.svg"
      large
      modal={dateEditModal}
      modalClose={handleClose}
    >
      날짜 선택
    </CustomModal>
  );
}

export default DateEditModal;
