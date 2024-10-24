import styled from "styled-components";
import theme from "../../../theme";

const SearchLoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 240px;
  overflow: hidden;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral400};
`;

const SearchLoading = () => {
  return <SearchLoadingContainer>로딩 중...</SearchLoadingContainer>;
};

export default SearchLoading;
