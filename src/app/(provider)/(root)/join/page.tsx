import JoinForm from "@/components/login-join/JoinForm";
import Title from "@/components/login-join/Title";

function JoinPage() {
  return (
    <div>
      <Title title="회원가입" content="푸드로그의 회원이 되어주세요." />
      <JoinForm />
    </div>
  );
}

export default JoinPage;
