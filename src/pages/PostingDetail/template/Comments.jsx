import styled from "styled-components";
import theme from "../../../theme";
import Button from "../../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const CommentsContainer = styled.div`
  border-radius: ${theme.borderRadius.md};
  width: 800px;
  min-height: 360px;
  padding: 40px 80px 80px 80px;
  background: ${theme.colors.white};
`;

const CommentHeader = styled.div`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral700};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 20px 34px;
  margin-top: 20px;
  margin-bottom: 5px;
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

const Author = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;
const CommentDate = styled.div`
  display: flex;
  justify-content: end;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
`;

const AuthorW = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin-bottom: 10px;
`;

const CommentContentW = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral100};
`;
const CommentDateW = styled.div`
  display: flex;
  justify-content: end;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral200};
`;

const CommentBlock = styled.div`
  width: 500px;
  padding: 10px 30px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral100};
  align-items: end;
  margin-bottom: 10px;
`;

const CommentBlock2 = styled.div`
  width: 500px;
  padding: 10px 30px;
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md}
    ${theme.borderRadius.md} 0;
  background-color: ${theme.colors.neutral100};
  align-items: end;
  margin-bottom: 10px;
`;

const CommentBlockW = styled.div`
  width: 500px;
  padding: 10px 30px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral600};
  align-items: end;
  margin-bottom: 10px;
`;

const CommentBlockW2 = styled.div`
  width: 500px;
  padding: 10px 30px;
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0
    ${theme.borderRadius.md};
  background-color: ${theme.colors.neutral600};
  align-items: end;
  margin-bottom: 10px;
`;

const CommentLeft = styled.div`
  width: "700px";
  display: flex;
  justify-content: start;
`;

const CommentRight = styled.div`
  width: "700px";
  display: flex;
  justify-content: end;
`;

const Comments = ({ postingId }) => {
  // 저장되어야 할 데이터
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        // Axios API 호출
        // const response = await axios.get(`/api/comment/posting/${postingId}`);

        // Dummy Data (API 연동 전까지 사용)

        const dummyData = [
          {
            postingId: 1,
            writerNickname: "Username02",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Ex lectus feugiat consectetur auctor viverra nulla nulla augue aliquam.",
            createdAt: "2024-10-29",
            modifedAt: "2024-10-30",
            isPostingWriter: false,
            profile: "https://i.imgur.com/QHfydVa.png",
          },
          {
            postingId: 1,
            writerNickname: "Username02",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Tellus eget vestibulum parturient ipsum et himenaeos lacus maecenas cursus consequat at sollicitudin pharetra vestibulum tempor morbi imperdiet aliquam ante libero lectus cursus mattis gravida.",
            createdAt: "2024-10-29",
            modifedAt: "2024-10-30",
            isPostingWriter: false,
            profile: "https://i.imgur.com/QHfydVa.png",
          },
          {
            postingId: 1,
            writerNickname: "Username01",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Ex lectus feugiat consectetur auctor viverra nulla nulla augue aliquam.",
            createdAt: "2024-10-29",
            modifedAt: "2024-10-30",
            isPostingWriter: true,
            profile: "https://i.imgur.com/VnZtNxH.png",
          },
          {
            postingId: 1,
            writerNickname: "Username04",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Ex lectus feugiat consectetur auctor viverra nulla nulla augue aliquam.",
            createdAt: "2024-10-29",
            modifedAt: "2024-10-30",
            isPostingWriter: false,
            profile: "https://i.imgur.com/VXvXELL.png",
          },
        ];

        // API 연동 시에는 response.data를 사용하고, 더미데이터는 주석처리
        // setCommentList(response.data);
        setCommentList(dummyData);
      } catch (error) {
        // Axios 에러 처리
        if (axios.isAxiosError(error)) {
          console.error("API 에러:", error.response?.data || error.message);
        } else {
          console.error("게시글을 불러오는데 실패했습니다:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postingId]);

  const handleSave = () => {
    const data = {
      content: comment,
    };

    alert(data.content);
  };

  return (
    <CommentsContainer>
      <CommentHeader>{commentList.length}개의 댓글</CommentHeader>
      {commentList.map((comment, inx) => {
        if (comment.isPostingWriter == true) {
          if (
            !commentList[inx + 1] ||
            (commentList[inx + 1] &&
              commentList[inx + 1].writerNickname != comment.writerNickname)
          ) {
            return (
              <CommentRight>
                <CommentBlockW2>
                  <div className="pt-2">
                    <AuthorW>
                      <img src={comment.profile} width={24} height={24} />
                      {comment.writerNickname}
                    </AuthorW>
                    <CommentContentW>{comment.content}</CommentContentW>
                  </div>
                  <CommentDateW>{comment.createdAt}</CommentDateW>
                </CommentBlockW2>
              </CommentRight>
            );
          } else {
            return (
              <CommentRight>
                <CommentBlockW>
                  <div>
                    <AuthorW>
                      <img src={comment.profile} width={24} height={24} />
                      {comment.writerNickname}
                    </AuthorW>
                    <CommentContentW>{comment.content}</CommentContentW>
                  </div>
                  <CommentDateW>{comment.createdAt}</CommentDateW>
                </CommentBlockW>
              </CommentRight>
            );
          }
        } else {
          if (
            !commentList[inx + 1] ||
            (commentList[inx + 1] &&
              commentList[inx + 1].writerNickname != comment.writerNickname)
          ) {
            return (
              <CommentLeft>
                <CommentBlock2>
                  <div className="pt-2">
                    <Author>
                      <img src={comment.profile} width={24} height={24} />
                      {comment.writerNickname}
                    </Author>
                    <CommentContent>{comment.content}</CommentContent>
                  </div>
                  <CommentDate>{comment.createdAt}</CommentDate>
                </CommentBlock2>
              </CommentLeft>
            );
          } else {
            return (
              <CommentLeft>
                <CommentBlock>
                  <div>
                    <Author>
                      <img src={comment.profile} width={24} height={24} />
                      {comment.writerNickname}
                    </Author>
                    <CommentContent>{comment.content}</CommentContent>
                  </div>
                  <CommentDate>{comment.createdAt}</CommentDate>
                </CommentBlock>
              </CommentLeft>
            );
          }
        }
      })}
      <StyledTextArea
        rows={3}
        placeholder="댓글을 입력하세요."
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          type="posting"
          width="120px"
          text="댓글쓰기"
          // disabled={!isValid}
          onClick={handleSave}
        />
      </div>
    </CommentsContainer>
  );
};

export default Comments;
