"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import Button from "../common/Button";

function JoinForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("/api/auth/join", {});
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  return (
    <form className="flex flex-col items-center justify-center mb-[350px]">
      <div className="flex flex-col gap-y-5 mb-[25px] px-[35px] py-[40px] border-[1px] border-[#F5F5F5] rounded-[30px]">
        <InputField
          name="닉네임"
          value={nickname}
          onChangeValue={onChangeNickname}
          required
        />
        <InputField
          name="이메일"
          value={email}
          onChangeValue={onChangeEmail}
          required
        />
        <InputField
          name="비밀번호"
          value={password}
          onChangeValue={onChangePassword}
          required
          password
        />
        <InputField
          name="비밀번호 확인"
          value={checkPassword}
          onChangeValue={onChangeCheckPassword}
          required
          password
        />
      </div>
      <Button>가입하기</Button>
    </form>
  );
}

export default JoinForm;
