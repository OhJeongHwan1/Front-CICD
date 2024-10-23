import styled from "styled-components";
import theme from "../../../theme";

const PostingLoadContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 360px;
  overflow: hidden;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral400};
`;

const PostingLoad = () => {
  return <PostingLoadContainer>로딩 중...</PostingLoadContainer>;
};

export default PostingLoad;
