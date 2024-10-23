import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import InputDateStyle from "../datePickerStyle";
import styled from "styled-components";
import theme from "../theme";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const PickerWrap = styled.div`
  height: 32px;
  background-color: ${theme.colors.neutral100};
  width: 240px;
  display: flex;
  align-items: center;
  border-radius: 30px;

  .react-datepicker__input-container {
    input {
      width: 120px;
      height: 32px;
      text-align: center;
      border-radius: 30px;
      outline: none;
      line-height: 23px;
      border: 1px solid transparent;
      transition: 0.5s;
      font-size: ${theme.fontSizes.sm};
      font-weight: ${theme.fontWeight.regular};
      background-color: ${theme.colors.neutral100};

      &:focus {
        border: 1px solid ${theme.colors.primary};
        background-color: #fff;
      }
    }
  }
`;

const CustomDatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setLastChangedDate,
}) => {
  return (
    <InputDateStyle>
      <PickerWrap>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          placeholderText="시작일"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          placeholderText="종료일"
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
          }}
        />
      </PickerWrap>
    </InputDateStyle>
  );
};

export default CustomDatePicker;
