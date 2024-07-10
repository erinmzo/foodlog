"use client";
import { useState } from "react";
import Button from "../common/Button";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/auth";

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
      const errorData = await response.json();
      return alert(
        `아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.`
      );
    }
    const data = await response.json();
    saveUser(data);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmitLogin}
      className="flex flex-col items-center justify-center mb-[475px]"
    >
      <div className="flex flex-col gap-y-5 mb-[25px] px-[35px] py-[53px] border-[1px] border-[#F5F5F5] rounded-[30px]">
        <InputField name="이메일" value={email} onChangeValue={onChangeEmail} />
        <InputField
          name="비밀번호"
          value={password}
          onChangeValue={onChangePassword}
          password
        />
      </div>
      <Button>로그인하기</Button>
    </form>
  );
}

export default LoginForm;
