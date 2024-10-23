import styled from "styled-components";
import theme from "../../../theme";

const PostingNotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 360px;
  overflow: hidden;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral400};
`;

const PostingNotFound = () => {
  return (
    <PostingNotFoundContainer>
      게시글을 찾을 수 없어요.
    </PostingNotFoundContainer>
  );
};

export default PostingNotFound;
