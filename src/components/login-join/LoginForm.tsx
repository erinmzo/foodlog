"use client";
import { useAuthStore } from "@/zustand/auth";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import { useState } from "react";
import Button from "../common/Button";
import InputField from "./InputField";

function LoginForm() {
  const saveUser = useAuthStore((state) => state.saveUser);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginData = { email, password };
  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (response.status !== 200) {
      return Report.failure(
        "로그인에 실패했습니다.",
        "아이디와 비밀번호를 정확히 입력해 주세요.",
        "확인"
      );
    }
    const data = await response.json();
    saveUser(data.user);
    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmitLogin}
      className="flex flex-col items-center justify-center "
    >
      <div className="flex flex-col gap-y-5 mb-[25px] px-[35px] py-[53px] border-[1px] border-[#F5F5F5] rounded-[30px]">
        <InputField
          name="이메일"
          value={email}
          type={"email"}
          minLength={5}
          maxLength={254}
          onChangeValue={onChangeEmail}
        />
        <InputField
          name="비밀번호"
          type={"password"}
          value={password}
          minLength={6}
          maxLength={20}
          onChangeValue={onChangePassword}
        />
      </div>
      <Button>로그인하기</Button>
    </form>
  );
}

export default LoginForm;
