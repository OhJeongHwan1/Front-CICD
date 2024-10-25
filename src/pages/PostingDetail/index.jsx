import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostingNotFound from "./template/PostingNotFound";
import CustomLoading from "../../components/CustomLoading";
import styled from "styled-components";
import theme from "../../theme";
import DynamicSVG from "../../components/DynamicSVG";
import CustomViewer from "./template/CustomViewer";
import Comments from "./template/Comments";
import TopButton from "../../components/TopButton";
import axios from "axios";
import SpaceCard from "./template/SpaceCard";
import NextPosting from "./template/NextPosting";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostingDetailAsync,
  deletePostingAsync,
  selectPosting,
} from "../../redux/postingSlice";
import { getMySpaceListAsync } from "../../redux/userSlice";
import { cityCodeToName, nationCodeToName } from "../../data/LocationCode";

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
  border-radius: 6px;

  &:hover {
    background-color: ${theme.colors.neutral200};
  }
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
  const { selectedPostingId } = useSelector(selectPosting);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostingDetailAsync(selectedPostingId))
      .unwrap()
      .then((res) => {
        setPostData(res);
        setLoading(false);
      });
  }, [selectedPostingId]);

  const deletePosting = () => {
    dispatch(deletePostingAsync(selectedPostingId))
      .unwrap()
      .then(() => {
        alert("삭제되었습니다.");
        navigate("/");
      });
  };

  if (loading) return <CustomLoading isFullScreen />;
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
            <img
              src={postData.profile}
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
            {postData.writerNickname}
          </UserArea>
          <EditBtnArea>
            {/* <EditBtn>수정</EditBtn> */}
            <EditBtn onClick={deletePosting}>삭제</EditBtn>
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
            {`자유의 여신상, ${cityCodeToName[postData.cityCode]}, ${
              nationCodeToName[postData.nationCode]
            }`}
          </InfoItem>
          <InfoItem>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral500}
              width={24}
              height={24}
            />
            {postData.createdAt}
          </InfoItem>
          <InfoItem>
            <DynamicSVG
              svgUrl="/edit2.svg"
              color={theme.colors.neutral500}
              width={24}
              height={24}
            />
            {postData.modifiedAt}
          </InfoItem>
        </InfoArea>
        <CustomViewer content={postData.content} />
        <AssociatedPostingArea>
          <NextPosting
            isDisabled={parseInt(selectedPostingId) == 1}
            isNext={false}
            postingId={selectedPostingId}
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
            isDisabled={parseInt(selectedPostingId) == 2}
            isNext={true}
            postingId={selectedPostingId}
            postingTitle={postData.nextPostingTitle}
          />
        </AssociatedPostingArea>
      </PostingContainer>
      {/* <Comments postingId={selectedPostingId} /> */}
      <div className="mb-32" />
      <TopButton />
      <Background />
    </PostingDetailContainer>
  );
}

export default PostingDetail;
