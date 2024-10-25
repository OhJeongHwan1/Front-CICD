import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../theme";
import UserProfileCard from "./template/UserProfileCard";
import DynamicSVG from "../../components/DynamicSVG";
import MySpaceComp from "./template/MySpaceComp";
import MyPostingComp from "./template/MyPostingComp";
import MyCommentComp from "./template/MyCommentComp";
import MyFollowComp from "./template/MyFollowComp";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import AddFollowModal from "./template/AddFollowModal";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { getMySpaceListAsync, setMySpace } from "../../redux/userSlice";
import CustomLoading from "../../components/CustomLoading";

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-right: 30px;
  min-width: 1280px;
  padding-top: 30px;
  position: relative;
  top: -30px;
  background-color: ${theme.colors.neutral100};
`;

const MyPageTopSection = styled.div`
  display: flex;
  margin-top: 20px;
`;

const MyPageSelectList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: #fff;
  border-radius: ${theme.borderRadius.md};
  margin: 0 30px 0 20px;
`;

const SelectListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 30px 3px 30px;
  gap: 10px;
  cursor: pointer;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ selected }) =>
    selected ? `${theme.colors.primary}` : `${theme.colors.neutral700}`};
  border-bottom: ${({ selected }) =>
    selected ? `7px solid ${theme.colors.primary}` : "7px solid transparent"};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const IconAndTotal = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin-right: 5px;
  }
  font-weight: ${theme.fontWeight.regular};
`;

const MyPageBottomSection = styled.div`
  padding: 20px 30px 30px 0;
`;

const MyPageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-top: 20px;
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
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  const [total, setTotal] = useState({
    space: 0,
    posting: 0,
    comment: 0,
    follow: 0,
  });

  const handleCommentTotal = (count) => {
    setTotal((prev) => ({
      ...prev,
      comment: count,
    }));
  };

  const handleFollowTotal = (count) => {
    setTotal((prev) => ({
      ...prev,
      follow: count,
    }));
  };

  const [isOpen, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialSelectedState);
  const [spaceResponse, setSpaceResponse] = useState();
  // const [mySpace, setMySpace] = useState(null);
  const { mySpace } = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (isInitialMount.current) {
    //   isInitialMount.current = false; // 첫 렌더링에서는 true, 이후 false로 설정
    // } else {
    setLoading(true);
    dispatch(getMySpaceListAsync())
      .unwrap()
      .then((res) => {
        setLoading(false);
        dispatch(setMySpace(res));
      });
    // }
  }, [user]);

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
    // 추가 로직 (예: API 호출 등)
  };

  const handleFollowModal = () => {
    setOpen(!isOpen);
  };

  const getSvgUrl = () => {
    if (selectedItems.space) return "/home-2.svg";
    if (selectedItems.posting) return "/edit2.svg";
    if (selectedItems.comment) return "/message-text.svg";
    if (selectedItems.follow) return "/heart.svg";
    return "/default-icon.svg";
  };

  const getTitle = () => {
    if (selectedItems.space) return "참여 중인 스페이스";
    if (selectedItems.posting) return "내 포스팅";
    if (selectedItems.comment) return "내 댓글";
    if (selectedItems.follow) return "내 이웃";
    return "잘못된 접근"; // 기본 아이콘 설정
  };

  if (loading) return <CustomLoading isFullScreen />;

  return (
    <Background>
      <MyPageTopSection>
        <UserProfileCard user={user}></UserProfileCard>

        <MyPageSelectList>
          <SelectListItem
            selected={selectedItems.space}
            onClick={() => handleItemClick("space")}
          >
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/home-2.svg"}
                color={
                  selectedItems.space
                    ? `${theme.colors.primary}`
                    : `${theme.colors.neutral700}`
                }
              ></DynamicSVG>
              <p>{total.space}</p>
            </IconAndTotal>
            스페이스 보기
          </SelectListItem>
          <SelectListItem
            selected={selectedItems.posting}
            onClick={() => handleItemClick("posting")}
          >
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/edit2.svg"}
                color={
                  selectedItems.posting
                    ? `${theme.colors.primary}`
                    : `${theme.colors.neutral700}`
                }
              ></DynamicSVG>
              <div>{total.posting}</div>
            </IconAndTotal>
            포스팅 보기
          </SelectListItem>
          <SelectListItem
            selected={selectedItems.comment}
            onClick={() => handleItemClick("comment")}
          >
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/message-text.svg"}
                color={
                  selectedItems.comment
                    ? `${theme.colors.primary}`
                    : `${theme.colors.neutral700}`
                }
              ></DynamicSVG>
              <div>{total.comment}</div>
            </IconAndTotal>
            작성한 댓글 보기
          </SelectListItem>
          <SelectListItem
            selected={selectedItems.follow}
            onClick={() => handleItemClick("follow")}
          >
            <IconAndTotal>
              <DynamicSVG
                svgUrl={"/heart.svg"}
                color={
                  selectedItems.follow
                    ? `${theme.colors.primary}`
                    : `${theme.colors.neutral700}`
                }
              ></DynamicSVG>
              <div>{total.follow}</div>
            </IconAndTotal>
            내 이웃 보기
          </SelectListItem>
        </MyPageSelectList>
      </MyPageTopSection>
      <MyPageBottomSection>
        <MyPageTitle>
          <div className="flex">
            <DynamicSVG
              svgUrl={getSvgUrl()}
              color={`${theme.colors.neutral700}`}
              width={30}
              height={30}
            />
            <span>{getTitle()}</span>
          </div>
          {selectedItems.posting && (
            <Button
              text={"포스팅 작성"}
              type={"posting"}
              width={"160px"}
              btnClick={() => navigate("/posting/add")}
            ></Button>
          )}
          {selectedItems.follow && (
            <Button
              text={"이웃 추가"}
              type={"follow"}
              width={"160px"}
              btnClick={handleFollowModal}
            ></Button>
          )}
        </MyPageTitle>
        {selectedItems.space && <MySpaceComp mySpace={mySpace} />}
        {selectedItems.posting && <MyPostingComp></MyPostingComp>}
        {selectedItems.comment && <MyCommentComp user={user} />}
        {selectedItems.follow && <MyFollowComp></MyFollowComp>}
      </MyPageBottomSection>
      <AddFollowModal
        isOpen={isOpen}
        onClose={handleFollowModal}
      ></AddFollowModal>
    </Background>
  );
}

export default MyInfo;
