import styled from "styled-components";
import theme from "../../../theme";

const CommentsContainer = styled.div`
  border-radius: ${theme.borderRadius.md};
  width: 800px;
  min-height: 360px;
  padding: 40px 80px 0 80px;
  background: ${theme.colors.white};
  margin-bottom: 80px;
`;

const CommentHeader = styled.div`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral700};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 20px 34px;
  background: #f1f5f9;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 25px;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px;
  transition: 0.2s;
  outline: none;
  resize: none;

  &:focus {
    border: 1px solid var(--primary, #6a68f9);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(232, 232, 245, 0.9);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 5px 0;
  }
`;

const Comments = ({ commentList }) => {
  return (
    <CommentsContainer>
      <CommentHeader>{commentList.length}개의 댓글</CommentHeader>
      <StyledTextArea rows={3} placeholder="댓글을 입력하세요." />
    </CommentsContainer>
  );
};

export default Comments;
