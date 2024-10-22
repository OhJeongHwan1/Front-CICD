import React from "react";
import Button from "../../components/Button";
import EditButton from "../../components/EditButton";
import Input from "../../components/Input";
import PostingCard from "../../components/PostingCard";
import theme from "../../theme";

function Main() {
  const handleClick = () => {
    alert("dsadadsad");
  };

  return (
    <div style={{ backgroundColor: theme.colors.neutral50, height: "100vh" }}>
      Main
      <br></br>
      <Button
        btnClick={handleClick}
        width={150}
        text="로그인"
        //disabled={true}
      />
      <br></br>
      <EditButton btnClick={handleClick} width={150} text="수정" />
      <br></br>
      <Input type="searc" placeholder="검색어를 입력해주세여." />
      <PostingCard
        postingId={1}
        title={"오사카 여행일지 #4"}
        travelDate={"2024-10-30"}
        mainImg={"https://i.imgur.com/0TIs0vO.png"}
        content={
          "오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다."
        }
        nickname={"USER001"}
        profileImg={"https://i.imgur.com/T2tqUEG.png"}
        createAt={"2024-10-30"}
      />
    </div>
  );
}

export default Main;
