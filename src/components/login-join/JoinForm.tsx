"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

function JoinForm() {
  const supabase = createClient();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const joinData = { nickname, email, password };
  const router = useRouter();

  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: userNickname } = await supabase
      .from("profile")
      .select()
      .eq("nickname", nickname);

    if (userNickname?.find((userName) => nickname === userName.nickname)) {
      return alert("이미 사용중인 닉네임 입니다.");
    }

    // const { data: userEmail, error };
    if (password !== checkPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    const response = await fetch("/api/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    });

    if (response.ok) {
      alert("회원가입이 성공적으로 완료되었습니다.");
    } else {
      const data = await response.json();
      return alert(`회원가입에 실패하였습니다: ${data.message}`);
    }

    router.push("/login");
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
    <form
      onSubmit={handleSubmitJoin}
      className="flex flex-col items-center justify-center mb-[350px]"
    >
      <div className="flex flex-col gap-y-5 mb-[25px] px-[35px] py-[40px] border-[1px] border-[#F5F5F5] rounded-[30px]">
        <InputField
          name="닉네임"
          type={"text"}
          value={nickname}
          minLength={2}
          maxLength={10}
          onChangeValue={onChangeNickname}
          required
        />
        <InputField
          name="이메일"
          type={"email"}
          value={email}
          minLength={5}
          maxLength={254}
          onChangeValue={onChangeEmail}
          required
        />
        <InputField
          name="비밀번호"
          type={"password"}
          value={password}
          minLength={6}
          maxLength={20}
          onChangeValue={onChangePassword}
          required
        />
        <InputField
          name="비밀번호 확인"
          type={"password"}
          value={checkPassword}
          minLength={6}
          maxLength={20}
          onChangeValue={onChangeCheckPassword}
          required
        />
      </div>
      <Button>가입하기</Button>
    </form>
  );
}

export default JoinForm;
