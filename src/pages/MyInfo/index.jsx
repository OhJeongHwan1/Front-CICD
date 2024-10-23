import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import UserProfileCard from "./template/UserProfileCard";
import DynamicSVG from "../../components/DynamicSVG";
import MySpaceComp from "./template/MySpaceComp";
import MyPostingComp from "./template/MyPostingComp";
import MyCommentComp from "./template/MyCommentComp";
import FollowComp from "./template/FollowComp";

const Background = styled.div`
  background-color: ${theme.colors.neutral100};
  width: 100%;
  min-height: 100vh;
`;

const MyPageTopSection = styled.div`
  display: flex;
`;

const MyPageSelectList = styled.ul`
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  margin-left: 30px;
`;

const SelectListItem = styled.li`
  display: flex;
  flex-direction: column;
  height: 130px;
  padding: 40px;
  gap: 10px;
  cursor: pointer;
`;

const IconAndTotal = styled.div`
  display: flex;
  justify-content: center;
  img {
    margin-right: 5px;
  }
`;

const MyPageBottomSection = styled.div`
  background-color: pink;
  padding: 20px 30px 30px 0;
`;

const Title = styled.div`
  display: flex;
  padding-bottom: 20px;

  span {
    font-size: ${theme.fontSizes.h3};
    font-weight: ${theme.fontWeight.bold};
    margin-left: 10px;
  }
`;

const initialSelectedState = {
  space: true,
  posting: false,
  comment: false,
  follow: false,
};

function MyInfo() {
  const [nickname, setNickname] = useState("Username");
  const [email, setEmail] = useState("defaultuser@naver.com");
  const [total, setTotal] = useState({
    space: 0,
    posting: 0,
    comment: 0,
    follow: 0,
  });
  const [selectedItems, setSelectedItems] = useState(initialSelectedState);

  const handleItemClick = (item) => {
    // 이미 선택된 항목이 클릭되면 아무 일도 하지 않는다.
    if (selectedItems[item]) {
      return;
    }
    // 모든 항목을 false로 설정하고, 클릭한 항목만 true로 설정한다.
    setSelectedItems({
      space: item === "space",
      posting: item === "posting",
      comment: item === "comment",
      follow: item === "follow",
    });
    console.log(`${item} has been selected.`);
    // 추가 로직 (예: API 호출 등)
  };

  // 현재 선택된 항목에 따른 SVG URL 결정
  const getSvgUrl = () => {
    if (selectedItems.space) return "/home-2.svg";
    if (selectedItems.posting) return "/edit2.svg";
    if (selectedItems.comment) return "/message-text.svg";
    if (selectedItems.follow) return "/heart.svg";
    return "/default-icon.svg"; // 기본 아이콘 설정
  };

  const getTitle = () => {
    if (selectedItems.space) return "참여 중인 스페이스";
    if (selectedItems.posting) return "내 포스팅";
    if (selectedItems.comment) return "내 댓글";
    if (selectedItems.follow) return "내 이웃";
    return "잘못된 접근"; // 기본 아이콘 설정
  };

  return (
    <Background>
      <MyPageTopSection>
        <UserProfileCard nickname={nickname} email={email}></UserProfileCard>
        <MyPageSelectList>
          <SelectListItem onClick={() => handleItemClick("space")}>
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/home-2.svg"}
                color={`${theme.colors.neutral700}`}
              ></DynamicSVG>
              <div>{total.space}</div>
            </IconAndTotal>
            스페이스 보기
          </SelectListItem>
          <SelectListItem onClick={() => handleItemClick("posting")}>
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/edit2.svg"}
                color={`${theme.colors.neutral700}`}
              ></DynamicSVG>
              <div>{total.posting}</div>
            </IconAndTotal>
            포스팅 보기
          </SelectListItem>
          <SelectListItem onClick={() => handleItemClick("comment")}>
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/message-text.svg"}
                color={`${theme.colors.neutral700}`}
              ></DynamicSVG>
              <div>{total.comment}</div>
            </IconAndTotal>
            작성한 댓글 보기
          </SelectListItem>
          <SelectListItem onClick={() => handleItemClick("follow")}>
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/heart.svg"}
                color={`${theme.colors.error}`}
              ></DynamicSVG>
              <div>{total.follow}</div>
            </IconAndTotal>
            내 이웃 보기
          </SelectListItem>
        </MyPageSelectList>
      </MyPageTopSection>
      <MyPageBottomSection>
        <Title>
          <DynamicSVG
            svgUrl={getSvgUrl()}
            color={`${theme.colors.neutral700}`}
            width={30}
            height={30}
          />
          <span>{getTitle()}</span>
        </Title>
        {selectedItems.space && <MySpaceComp></MySpaceComp>}
        {selectedItems.posting && <MyPostingComp></MyPostingComp>}
        {selectedItems.comment && <MyCommentComp></MyCommentComp>}
        {selectedItems.follow && <FollowComp></FollowComp>}
      </MyPageBottomSection>
    </Background>
  );
}

export default MyInfo;
