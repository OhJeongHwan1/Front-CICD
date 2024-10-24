import styled from "styled-components";
import theme from "../../../theme";

const SearchNotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 240px;
  overflow: hidden;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral400};
`;

const SearchNotFound = () => {
  return <SearchNotFoundContainer>검색 결과가 없어요.</SearchNotFoundContainer>;
};

export default SearchNotFound;
