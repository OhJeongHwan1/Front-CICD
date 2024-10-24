import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostingCard from "../../../components/PostingCard";
import { getMyPostings } from "../../../api/api"; // API 함수 import 가정
import theme from "../../../theme";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 20px;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  color: ${theme.colors.neutral400};
  font-size: ${theme.fontSizes.lg};
`;

const LoadingState = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  color: ${theme.colors.neutral400};
`;

function MyPostingComp() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getMyPostings();
      setPosts(response.data);
    } catch (err) {
      setError("포스팅을 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState>포스팅을 불러오는 중입니다...</LoadingState>;
  }

  if (error) {
    return <EmptyState>{error}</EmptyState>;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState>작성한 포스팅이 없습니다.</EmptyState>;
  }

  return (
    <Container>
      {posts.map((post) => (
        <PostingCard
          key={post.id}
          width="100%"
          title={post.title}
          mainImg={post.mainImg}
          content={post.content}
          commentsCount={post.commentsCount}
          createAt={post.createAt}
          isMine={true}
          onClick={() => {
            // 포스팅 상세 페이지로 이동
            window.location.href = `/posting/${post.id}`;
          }}
        />
      ))}
    </Container>
  );
}

export default MyPostingComp;
