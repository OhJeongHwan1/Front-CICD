import styled from "styled-components";
import theme from "./theme";

const InputDateStyle = styled.section`
  display: flex;
  // 달력 이미지 사용을 위해 input 박스 커스텀하는 부분
  & #startDate:checked + label,
  & #endDate:checked + label {
    background-color: #038dff;
    border: 2px solid #038dff;
  }

  & #startDate,
  #endDate {
    width: 130px;
    height: 40px;
    background: #fbfbfb 0% 0% no-repeat padding-box;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    text-align: center;
    font: normal normal normal 16px/19px Pretendard;
    letter-spacing: 0px;
    color: white;

    &::selection {
      color: white;
    }
  }

  .active {
    background: #ffffff 0% 0% no-repeat padding-box !important;
  }

  #startDate::before,
  #startDate::after,
  #endDate::before,
  #endDate::after {
    content: "\e99c";
    display: inline-block;
    position: absolute;
    top: 7px;
    left: 7px;
    font-family: icomoon !important;
    font-size: 1rem;
    color: #333;

    border: 1px solid #ffffff;
  }

  // 달력 Header 조절
  .date-customheader {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;

    svg {
      cursor: pointer;
      stroke: #666666;
      stroke-width: 2px;
      margin-top: 4px;
    }
  }
  .react-datepicker__navigation {
    top: 10px;
  }

  .react-datepicker {
    border-radius: 20px !important;
    border: none;
    box-shadow: 0px 2px 2px 2px #bdbdbd;
  }
  .react-datepicker__header {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
  }
  .react-datepicker__day-names {
    font-size: 12px;
    margin-top: 10px;

    .react-datepicker__day-name {
      color: #000000;
    }
  }
  .react-datepicker__day--weekend:first-child {
    color: red;
  }
  .react-datepicker__header {
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    padding: 10px;
  }
  .react-datepicker__day-name:first-child {
    color: red;
  }
  .react-datepicker__day--outside-month {
    color: #bdbdbd !important;
  }

  // 달력 헤더 > 월, 년 부분
  .custom-month {
    margin-top: 5px;

    .month {
      color: #000000;
      font-size: 17px;
    }

    .year {
      color: #666666;
      font-size: 15px;
    }
  }

  // 달력 Content 부분
  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle::after {
    border-top: none;
    border-bottom: none;
  }

  .react-datepicker-popper[data-placement^="top"]
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^="top"]
    .react-datepicker__triangle::after {
    border-top: none;
    border-bottom: none;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background: #0072de;
  }
  .react-datepicker__day--selected {
    background-color: #03a9f4;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: #03a9f4;
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

export default InputDateStyle;
