import MyPageList from "@/components/mypage/list/MyPageList";
import MyPageProfile from "@/components/mypage/profile/MyPageProfile";

function MyPage() {
  return (
    <div>
      <MyPageProfile />
      <MyPageList />
    </div>
  );
}

export default MyPage;
