import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostingNotFound from "./template/PostingNotFound";
import PostingLoad from "./template/PostingLoad";
import styled from "styled-components";
import theme from "../../theme";
import DynamicSVG from "../../components/DynamicSVG";
import CustomViewer from "./template/CustomViewer";
import Comments from "./template/Comments";
import TopButton from "../../components/TopButton";
import axios from "axios";
import SpaceCard from "./template/SpaceCard";
import NextPosting from "./template/NextPosting";

const PostingDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  position: fixed;
  z-index: -2;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const PostingContainer = styled.div`
  border-radius: ${theme.borderRadius.md};
  width: 800px;
  min-height: calc(100vh - 30px);
  padding: 80px 0 0 0;
  background: ${theme.colors.white};
  margin-bottom: 20px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0 80px;
  gap: 8px;
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral700};
`;

const SpaceArea = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral400};
  padding: 10px 80px;
`;

const WriterArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 80px;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral700};
`;

const EditBtnArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const EditBtn = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral400};
  cursor: pointer;
  padding: 0 10px;
`;

const InfoArea = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-top: 1px solid ${theme.colors.neutral200};
  border-bottom: 1px solid ${theme.colors.neutral200};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral500};
`;

const AssociatedPostingArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid ${theme.colors.neutral200};
  padding: 40px 80px;
`;

function PostingDetail() {
  const { postingId } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        // Axios API 호출
        // const response = await axios.get(`/api/posting/${postingId}`);

        // Dummy Data (API 연동 전까지 사용)
        const dummyData = {
          space: `새로운 여행0${postingId}`,
          spaceParticipantsProfile: [
            "https://i.imgur.com/VnZtNxH.png",
            "https://i.imgur.com/aXtrK5E.png",
            "https://i.imgur.com/UIAinYd.png",
            "https://i.imgur.com/QHfydVa.png",
            "https://i.imgur.com/VXvXELL.png",
            "https://i.imgur.com/D4UpBrx.png",
          ],
          spaceStartDate: "2024-10-10",
          spaceEndDate: "2024-10-21",
          postingId: postingId,
          prevPostingTitle: `미국 여행 #${parseInt(postingId) - 1}`,
          nextPostingTitle: `미국 여행 #${parseInt(postingId) + 1}`,
          nation: "미국",
          city: "샌프란시스코",
          writerProfile: "https://i.imgur.com/VnZtNxH.png",
          writerNickname: "USER001",
          writerEmail: "abcd@gmail.com",
          title: `미국 여행 #${postingId}`,
          accessLevel: "MEMBER_ONLY",
          mainImgUrl: "https://i.imgur.com/0TIs0vO.png",
          content:
            "![](https://i.imgur.com/0TIs0vO.png)\n## 새로운 포스팅 제목입니다.\n포스팅 내용입니다.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Vel cumque optio inventore at accusamus. Dolorum, atque, vitae mollitia beatae explicabo quos ex ut quibusdam repellat quis omnis nihil impedit ducimus nemo harum necessitatibus repudiandae ratione ipsa corporis quidem fugiat ab!\n![](https://i.imgur.com/0TIs0vO.png)\n## 새로운 포스팅 제목입니다.\n포스팅 내용입니다.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Vel cumque optio inventore at accusamus. Dolorum, atque, vitae mollitia beatae explicabo quos ex ut quibusdam repellat quis omnis nihil impedit ducimus nemo harum necessitatibus repudiandae ratione ipsa corporis quidem fugiat ab!",
          modifedAt: "2024-10-30",
          scheduleDate: "2024-10-11",
        };

        // API 연동 시에는 response.data를 사용하고, 더미데이터는 주석처리
        // setPostData(response.data);
        setPostData(dummyData);
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

  if (loading) return <PostingLoad />;
  if (!postData) return <PostingNotFound />;

  return (
    <PostingDetailContainer>
      <PostingContainer>
        <SpaceArea>{postData.space}</SpaceArea>
        <TitleArea>
          {postData.accessLevel === "PUBLIC" ? (
            <></>
          ) : (
            <DynamicSVG
              svgUrl="/lock.svg"
              color={theme.colors.neutral700}
              width={48}
              height={48}
            />
          )}
          {postData.title}
        </TitleArea>
        <WriterArea>
          <UserArea>
            <img src={postData.writerProfile} width={32} height={32} />
            {postData.writerNickname}
          </UserArea>
          <EditBtnArea>
            <EditBtn>수정</EditBtn>
            <EditBtn>삭제</EditBtn>
          </EditBtnArea>
        </WriterArea>
        <InfoArea>
          <InfoItem>
            <DynamicSVG
              svgUrl="/location.svg"
              color={theme.colors.neutral500}
              width={24}
              height={24}
            />
            {postData.city}, {postData.nation}
          </InfoItem>
          <InfoItem>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral500}
              width={24}
              height={24}
            />
            {postData.scheduleDate}
          </InfoItem>
          <InfoItem>
            <DynamicSVG
              svgUrl="/edit2.svg"
              color={theme.colors.neutral500}
              width={24}
              height={24}
            />
            {postData.modifedAt}
          </InfoItem>
        </InfoArea>
        <CustomViewer content={postData.content} />
        <AssociatedPostingArea>
          <NextPosting
            isDisabled={parseInt(postingId) == 1}
            isNext={false}
            postingId={postingId}
            postingTitle={postData.prevPostingTitle}
          />
          <SpaceCard
            space={postData.space}
            nation={postData.nation}
            city={postData.city}
            spaceParticipantsProfile={postData.spaceParticipantsProfile}
            spaceStartDate={postData.spaceStartDate}
            spaceEndDate={postData.spaceEndDate}
          />
          <NextPosting
            isDisabled={parseInt(postingId) == 2}
            isNext={true}
            postingId={postingId}
            postingTitle={postData.nextPostingTitle}
          />
        </AssociatedPostingArea>
      </PostingContainer>
      <Comments postingId={postingId} />
      <div className="mb-32" />
      <TopButton />
      <Background />
    </PostingDetailContainer>
  );
}

export default PostingDetail;
