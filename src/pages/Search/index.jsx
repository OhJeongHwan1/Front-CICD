import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme";
import SearchNotFound from "./template/SearchNotFound";
import SearchLoading from "./template/SearchLoading";

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  position: fixed;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const HeaderArea = styled.div`
  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral600};
`;

function Search() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchData = async (query) => {
      try {
        setLoading(true);
        // Axios API 호출
        // const response = await axios.get(`/api/posting/${postingId}`);

        // Dummy Data (API 연동 전까지 사용)
        const dummyData = [
          {
            postId: 1,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "오사카 여행일지 #4",
            content:
              "오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다. 오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다. 오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다.",
            commentsCount: 3,
            createAt: "2024-10-22",
            writerNickname: "USER001",
            profileImg: "https://i.imgur.com/T2tqUEG.png",
          },
          {
            postId: 2,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "오사카 여행일지 #3",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 33,
            createAt: "2024-10-22",
            writerNickname: "USER002",
            profileImg: "https://i.imgur.com/QHfydVa.png",
          },
          {
            postId: 3,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "오사카 여행일지 #2",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 333,
            createAt: "2024-10-22",
            writerNickname: "USER003",
            profileImg: "https://i.imgur.com/VXvXELL.png",
          },
          {
            postId: 4,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "오사카 여행일지 #1",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 3,
            createAt: "2024-10-22",
            writerNickname: "USER004",
            profileImg: "https://i.imgur.com/aXtrK5E.png",
          },
          {
            postId: 5,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "미국 여행일지 #3",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 3333,
            createAt: "2024-10-22",
            writerNickname: "USER005",
            profileImg: "https://i.imgur.com/D4UpBrx.png",
          },
          {
            postId: 6,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "미국 여행일지 #2",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 33,
            createAt: "2024-10-22",
            writerNickname: "USER006",
            profileImg: "https://i.imgur.com/UIAinYd.png",
          },
          {
            postId: 7,
            mainImg: "https://i.imgur.com/0TIs0vO.png",
            title: "미국 여행일지 #1",
            content:
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor natoque lacinia et imperdiet vitae duis ultricies. Leo luctus eu; habitant quisque conubia vel. Conubia conubia dis mattis; quis luctus commodo posuere elementum. Pretium velit nec et proin elementum quam congue. Odio rutrum at congue diam odio scelerisque tortor ipsum. Maecenas est nibh erat ante curae facilisi neque pellentesque. Luctus nascetur urna aenean pellentesque ante urna dui. Dapibus luctus odio dictumst fringilla vel dictumst nibh. Nullam platea morbi eleifend netus, justo amet.",
            commentsCount: 333,
            createAt: "2024-10-22",
            writerNickname: "USER001",
            profileImg: "https://i.imgur.com/T2tqUEG.png",
          },
        ];

        // API 연동 시에는 response.data를 사용하고, 더미데이터는 주석처리
        // setPostData(response.data);
        setData(dummyData);
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

    // query 값이 변경될 때마다 검색 실행
    if (query) {
      fetchData(query);
    }
  }, [query]);

  if (loading) return <SearchLoading />;
  if (!data) return <SearchNotFound />;

  return (
    <div>
      <HeaderArea>
        "{query}" 검색 결과 - {data.length}건
      </HeaderArea>

      <Background />
    </div>
  );
}

export default Search;
