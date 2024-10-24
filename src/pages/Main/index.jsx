import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PostingCard from "../../components/PostingCard";
import theme from "../../theme";
import { useNavigate } from "react-router";
import styled from "styled-components";
import CustomLoading from "../../components/CustomLoading";
import { convertToKoreanFormat } from "../../utils/convertTime";
import TopButton from "../../components/TopButton";
import SelectedButton2 from "./template/SelectedButton2";
import ExchangeCard from "./template/ExchangeCard";
import WeatherCard from "./template/WeatherCard";
import { useDispatch } from "react-redux";
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
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral600};
  padding-right: 30px;
  margin: 20px 0;
`;

const BodyArea = styled.div`
  padding: 20px 0;
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CardArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
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

const MainImg = styled.img`
  width: 420px;
  height: 260px;
  border-radius: ${theme.borderRadius.md};
`;

const MainImgText = styled.p`
  width: 420px;
  height: 260px;

  text-align: center;
  line-height: 260px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Montserrat;
  font-size: 52px;
  font-style: normal;
  font-weight: 400;
  color: ${theme.colors.neutral50};

  position: absolute;
  top: 0;
  left: 0;
`;

const ForwardedPostingCard = forwardRef((props, ref) => (
  <PostingCard {...props} ref={ref} />
));

ForwardedPostingCard.displayName = "ForwardedPostingCard";

function Main() {
  const [modal, setModal] = useState(false);
  const [location, setLocation] = useState({
    name: "서울",
    nation: "kr",
    city: "seoul",
    nationName: "대한민국",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 20;
  const TOTAL_ITEMS = 100;

  const goToPostingDetailPage = (postingId) => {
    navigate(`/posting/detail/${postingId}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const generateDummyData = useCallback((start, count) => {
    const remainingCount = Math.max(0, TOTAL_ITEMS - (start - 1));
    const actualCount = Math.min(count, remainingCount);

    return Array.from({ length: actualCount }, (_, index) => ({
      postId: start + index,
      mainImg: "https://i.imgur.com/0TIs0vO.png",
      title: `${index % 2 === 0 ? "오사카" : "미국"} 여행일지 #${
        start + index
      }`,
      content: "Lorem ipsum odor amet, consectetuer adipiscing elit...",
      commentsCount: Math.floor(Math.random() * 1000),
      createAt: "2024-10-22",
      writerNickname: `USER${String(Math.floor(Math.random() * 10)).padStart(
        3,
        "0"
      )}`,
      profileImg: `https://i.imgur.com/T2tqUEG.png`,
    }));
  }, []);

  const loadData = useCallback(
    async (currentPage) => {
      try {
        setLoading(true);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;

        // 일부러 딜레이를 주어 로딩 상태를 확인할 수 있게 함
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newData = generateDummyData(startIndex, ITEMS_PER_PAGE);

        setData((prev) => [...prev, ...newData]);
        setHasMore(startIndex + ITEMS_PER_PAGE <= TOTAL_ITEMS);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    },
    [generateDummyData]
  );

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
    if (page > 1) {
      loadData(page, false);
    }
  }, [page, loadData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setPage(1);
    setHasMore(true);
    loadData(1, true);
  }, [loadData]);

  useEffect(() => {
    const data = {
      nationCode: location.nation,
      cityCode: location.city,
    };
    dispatch(getPostingListAsync(data))
      .unwrap()
      .then((res) => setData(res));
    // .catch((err) => alert(err));
  }, [location]);

  if (loading && !data.length) {
    return (
      <>
        <CustomLoading />
        <Background />
      </>
    );
  }

  return (
    <div style={{ minWidth: "1280px" }}>
      <HeaderArea>
        여행지 정보
        <SelectedButton2
          setLocate={setLocation}
          locate={location}
          width="240px"
          color={theme.colors.white}
        />
      </HeaderArea>
      <BodyArea>
        <CardArea>
          <div
            style={{ position: "relative", width: "420px", minWidth: "420px" }}
          >
            <MainImg alt="" src="https://picsum.photos/300/300/?image=103" />
            <MainImgText>{location.name}</MainImgText>
          </div>
          <ExchangeCard nationCode={location.nation} />
          <WeatherCard city={location.city} />
        </CardArea>
      </BodyArea>
      <HeaderArea>최신 포스팅</HeaderArea>
      <BodyArea>
        {Array.from({ length: Math.ceil(data.length / 5) }).map(
          (_, rowIndex) => (
            <GridContainer key={rowIndex}>
              {data.slice(rowIndex * 5, (rowIndex + 1) * 5).map((item) => (
                <ForwardedPostingCard
                  onClick={() => goToPostingDetailPage(item.postId)}
                  key={item.postId}
                  title={item.title}
                  mainImg={item.mainImg}
                  content={item.content}
                  commentsCount={item.commentsCount}
                  createAt={convertToKoreanFormat(item.createAt)}
                  isMine={false}
                  nickname={item.writerNickname}
                  profileImg={item.profileImg}
                />
              ))}
            </GridContainer>
          )
        )}
        {hasMore && (
          <LoadingContainer ref={loadingRef}>
            {loading && <CustomLoading isFullScreen={false} />}
          </LoadingContainer>
        )}
      </BodyArea>
      <TopButton />
      <Background />
    </div>
  );
}

export default Main;
