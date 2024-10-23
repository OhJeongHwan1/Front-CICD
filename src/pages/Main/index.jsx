import React, { useState } from "react";
import Button from "../../components/Button";
import EditButton from "../../components/EditButton";
import Input from "../../components/Input";
import CustomModal from "../../components/CustomModal";
import PostingCard from "../../components/PostingCard";
import theme from "../../theme";
import ProfileStack from "../../components/ProfileStack";

function Main() {
  const [modal, setModal] = useState(false);

  const modalClose = () => {
    setModal(false);
  };
  const handleClick = () => {
    alert("dsadadsad");
  };

  return (
    <div>
      Main
      <br></br>
      <Button
        btnClick={handleClick}
        width={`150px`}
        text="로그인"
        disabled
        type="space"
      />
      <br></br>
      <EditButton btnClick={handleClick} width={`150px`} text="수정" />
      <br></br>
      <Input
        type="search"
        placeholder="검색어를 입력해주세여."
        center={true}
        error={true}
      />
      <button onClick={() => setModal(true)}>열기</button>
      {modal && (
        <CustomModal
          modal={modal}
          modalClose={modalClose}
          titleIcon="./folder-add2.svg"
          title="새로운 스페이스 만들기"
          large={false}
          btnText="수정"
          btnClick={() => alert("버튼 눌렸어!")}
          btnDisable={false}
          statusText={<p>asdasdasdadsasdadsadsdsdsd</p>}
          noBottom={false}
        >
          <div
            style={{ height: "200px", backgroundColor: "skyblue" }}
            onClick={() => alert("이렇게 내부 함수도 잘 동작해")}
          >
            asdhjadjsdhadjsahdjk
          </div>
        </CustomModal>
      )}
      <br></br>
      <Input type="searc" placeholder="검색어를 입력해주세여." />
      <PostingCard
        onClick={() => {
          alert("hi");
        }}
        width={100 / 2}
        title={
          "오사카 여행일지 #4 오사카 여행일지 #4 오사카 여행일지 #4 오사카 여행일지 #4"
        }
        mainImg={"https://i.imgur.com/0TIs0vO.png"}
        content={
          "오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다. 오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다. 오른쪽 하단에 적혀있는 날짜는 실제 작성일이며, 여행 날짜와 다를 수 있습니다."
        }
        commentsCount={311}
        createAt={"2024-10-30"}
        isMine={false}
        nickname={"USER001"}
        profileImg={"https://i.imgur.com/T2tqUEG.png"}
      />
      <div className="w-2 h-10" />
      <div className="flex flex-col gap-2">
        <ProfileStack profileList={["https://i.imgur.com/VnZtNxH.png"]} />
        <ProfileStack
          profileList={[
            "https://i.imgur.com/VnZtNxH.png",
            "https://i.imgur.com/QHfydVa.png",
          ]}
        />
        <ProfileStack
          profileList={[
            "https://i.imgur.com/VnZtNxH.png",
            "https://i.imgur.com/VXvXELL.png",
            "https://i.imgur.com/D4UpBrx.png",
          ]}
        />
        <ProfileStack
          profileList={[
            "https://i.imgur.com/VnZtNxH.png",
            "https://i.imgur.com/aXtrK5E.png",
            "https://i.imgur.com/UIAinYd.png",
            "https://i.imgur.com/QHfydVa.png",
            "https://i.imgur.com/VXvXELL.png",
            "https://i.imgur.com/D4UpBrx.png",
          ]}
          borderColor={theme.colors.neutral100}
        />
      </div>
    </div>
  );
}

export default Main;
