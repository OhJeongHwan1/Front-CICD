import React, { useState } from "react";
import Button from "../../components/Button";
import EditButton from "../../components/EditButton";
import Input from "../../components/Input";
import CustomModal from "../../components/CustomModal";
import NavigationBar from "../../components/NavBar";

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
        width={150}
        text="로그인"
        //disabled={true}
      />
      <br></br>
      <EditButton btnClick={handleClick} width={150} text="수정" />
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
      <NavigationBar />
    </div>
  );
}

export default Main;
