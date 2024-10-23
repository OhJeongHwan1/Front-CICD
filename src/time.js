export function formatDate(date) {
  if (!date) return "";

  // 연도, 월, 일을 각각 추출합니다.
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();

  // 월과 일이 10보다 작을 경우 앞에 '0'을 붙여 두 자리 수로 맞춥니다.
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // yyyy-mm-dd 형식의 문자열을 반환합니다.
  return `${year}-${formattedMonth}-${formattedDay}`;
}
