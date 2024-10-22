import React from "react";
import Button from "../../components/Button";
import EditButton from "../../components/EditButton";
import Input from "../../components/Input";

function Main() {
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
      <Input type="searc" placeholder="검색어를 입력해주세여." />
    </div>
  );
}

export default Main;
