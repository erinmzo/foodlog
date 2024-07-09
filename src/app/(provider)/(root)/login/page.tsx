import LoginForm from "@/components/login-join/LoginForm";
import Title from "@/components/login-join/Title";

async function LoginPage() {
  return (
    <div>
      <Title title="로그인" content="로그인하고 기록하고 공유하기!" />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
