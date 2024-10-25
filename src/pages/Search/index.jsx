import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme";
import SearchLoading from "../../components/CustomLoading";
import PostingCard from "../../components/PostingCard";
import { useDispatch } from "react-redux";
import { convertToKoreanFormat } from "../../utils/convertTime";
import TopButton from "../../components/TopButton";
import { searchLocationByName } from "../../data/LocationCode";
import CustomLoading from "../../components/CustomLoading";
import { getPostingListAsync } from "../../redux/postingSlice";

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
  margin: 20px 0;
`;

const BodyArea = styled.div`
  padding: 20px 0;
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const ForwardedPostingCard = forwardRef((props, ref) => (
  <PostingCard {...props} ref={ref} />
));

ForwardedPostingCard.displayName = "ForwardedPostingCard";

function Search() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loadingRef = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const goToPostingDetailPage = (postingId) => {
    navigate(`/posting/detail/${postingId}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const loc = searchLocationByName(query);

      console.log(loc);

      const param = {
        nationCode: !loc ? "0" : loc.nation,
        cityCode: !loc ? "0" : !loc.city ? "0" : loc.city,
        writerNickname: query,
        title: query,
        page: page,
      };

      const response = await dispatch(getPostingListAsync(param)).unwrap();

      setData((prevData) => [...prevData, ...response.content]);

      setHasMore(data.length < response.totalElements);

      setTotalItems(response.totalElements);

      console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, page, query]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setData([]);
    setPage(0);
    setHasMore(true);
    loadData();
  }, [query]);

  useEffect(() => {
    if (page > 0) {
      loadData();
    }
  }, [page, loadData]);

  if (loading && !data.length) {
    return (
      <>
        <CustomLoading isFullScreen={true} />
        <Background />
      </>
    );
  }

  return (
    <div>
      <HeaderArea>
        {query
          ? `"${query}" 검색 결과 - ${totalItems}건`
          : `전체 게시글 - ${totalItems}건`}
      </HeaderArea>
      <BodyArea>
        {Array.from({ length: Math.ceil(data.length / 5) }).map(
          (_, rowIndex) => (
            <GridContainer key={rowIndex}>
              {data.slice(rowIndex * 5, (rowIndex + 1) * 5).map((item) => (
                <ForwardedPostingCard
                  onClick={() => goToPostingDetailPage(item.postingId)}
                  key={item.postingId}
                  title={item.title}
                  mainImg={item.mainImgUrl}
                  content={item.content}
                  commentsCount={item.commentCnt}
                  createAt={convertToKoreanFormat(item.createdAt)}
                  isMine={false}
                  nickname={item.writerNickname}
                  profileImg={item.profile}
                  width="250px"
                />
              ))}
            </GridContainer>
          )
        )}
        {hasMore && (
          <LoadingContainer ref={loadingRef}>
            {loading && <SearchLoading />}
          </LoadingContainer>
        )}
      </BodyArea>
      <TopButton />
      <Background />
    </div>
  );
}

export default Search;
