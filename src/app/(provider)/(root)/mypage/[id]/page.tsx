import MyPageList from "@/components/mypage/list/MyPageList";
import ModalButton from "@/components/mypage/profile/modal/ModalButton";
import MyPageProfile from "@/components/mypage/profile/MyPageProfile";

function MyPage() {
  return (
    <div>
      <MyPageProfile />
      <ModalButton />
      <MyPageList />
    </div>
  );
}

export default MyPage;
