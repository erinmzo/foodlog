import LoginForm from "@/components/login-join/LoginForm";
import Title from "@/components/login-join/Title";
import Link from "next/link";

async function LoginPage() {
  return (
    <div>
      <Title title="로그인" content="로그인하고 기록하고 공유하기!" />
      <LoginForm />
      <div className="flex items-center justify-center mb-[475px]">
        <span className="mt-[40px] pt-[20px] px-[65px] border-t-[1px] border-[#F5F5F5]">
          아직 회원이 아니신가요?
          <Link className="ml-[5px] text-[#00BBF7]" href="/join">
            회원가입
          </Link>
          하러 가기
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
