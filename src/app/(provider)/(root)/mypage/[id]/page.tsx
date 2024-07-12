"use client";
import MyPageList from "@/components/mypage/list/MyPageList";
import ModalButton from "@/components/mypage/profile/modal/ModalButton";
import MyPageProfile from "@/components/mypage/profile/MyPageProfile";
import { useAuthStore } from "@/zustand/auth";
import { useRouter } from "next/navigation";

import { Report } from "notiflix";

function MyPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  if (!user) {
    Report.info("로그인되어야 마이페이지를 확인 할 수 있습니다.", "", "확인");
    router.push("/login");
  } else {
    return (
      <div className="pt-[70px] pb-[200px]">
        <MyPageProfile />
        <ModalButton />
        <MyPageList />
      </div>
    );
  }
}

export default MyPage;
