import React, { useState } from "react";
import CustomModal from "./CustomModal";
import Input from "./Input";
import { useNavigate } from "react-router";
import styled from "styled-components";
import theme from "../theme";
// import { login } from "../api/api";
import { loginAsync, setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { getMySpaceListAsync } from "../redux/userSlice";

const Highlight = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
`;

const ErrorText = styled.p`
  color: ${theme.colors.error};
  padding-top: 4px;
  font-size: small;
`;

function LoginModal({ loginModal, handleClose }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();

  const moveToRegister = () => {
    handleClose();
    navigate(`/register`);
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handlePasswordChange = (e) => {
    const pwInput = e.target.value;
    setPassword(pwInput);
  };

  const handleLogin = async () => {
    dispatch(
      loginAsync({
        email: email,
        password: password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(setUser(res));
        alert("로그인 되었습니다.");
        handleClose();

        dispatch(getMySpaceListAsync())
          .unwrap()
          .then((res) => {
            setLoading(false);
            dispatch(setMySpace(res));
          });
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 403") {
          setLoginError(true);
        }
      });
  };

  return (
    <CustomModal
      modal={loginModal}
      modalClose={handleClose}
      titleIcon={"/user-tag.svg"}
      title={"로그인"}
      btnText={"로그인하기"}
      statusText={
        loginError && <ErrorText>이메일 혹은 비밀번호가 틀렸어요.</ErrorText>
      }
      btnClick={handleLogin}
    >
      <div className="inputSection">
        <div className="pb-5">
          <Input
            the_type={"sms"}
            width={"100%"}
            placeholder={"이메일을 입력해주세요."}
            onChange={handleEmailChange}
          ></Input>
        </div>
        <Input
          the_type={"password"}
          type="password"
          width={"100%"}
          placeholder={"비밀번호를 입력해주세요."}
          onChange={handlePasswordChange}
        ></Input>
      </div>
      <div className="mt-6">
        <p className="flex justify-center cursor-pointer mt-3">
          아직 계정이 없으신가요?
          <Highlight onClick={moveToRegister}>&nbsp;회원가입 하기</Highlight>
        </p>
      </div>
    </CustomModal>
  );
}

export default LoginModal;
