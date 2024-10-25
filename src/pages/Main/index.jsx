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
import {
  getPostingListAsync,
  setSelectedPostingId,
} from "../../redux/postingSlice";
import CityImageSlider from "./template/ImageCard";

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
  width: 100%;
  height: 260px;
  border-radius: ${theme.borderRadius.md};
  background-size: cover;
`;

const MainImgText = styled.p`
  width: 500px;
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
  const [location, setLocation] = useState({
    name: "서울",
    nation: "kr",
    city: "seoul",
    nationName: "대한민국",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loadingRef = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToPostingDetailPage = (postingId) => {
    dispatch(setSelectedPostingId(postingId));
    navigate(`/posting/detail/${postingId}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const param = {
        nationCode: "",
        cityCode: "",
        writerNickname: "",
        title: "",
        page: page,
      };

      const response = await dispatch(getPostingListAsync(param)).unwrap();

      setData((prevData) => [...prevData, ...response.content]);

      setHasMore(data.length < response.totalElements);

      console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, page]);

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
    loadData(1, true);
  }, []);

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
          <CityImageSlider city={location.city} />
          <ExchangeCard nationCode={location.nation} />
          <WeatherCard city={location.city} />
        </CardArea>
      </BodyArea>
      <HeaderArea>전체 포스팅</HeaderArea>
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
