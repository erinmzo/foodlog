"use client";
import { useAuthStore } from "@/zustand/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Report } from "notiflix";

function WriteButton() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleWriteClick = () => {
    if (!user) {
      Report.info("로그인되어야 게시글 작성이 가능합니다.", "", "확인");
      router.push("/login");
    } else {
      router.push("/post/write/new");
    }
  };
  return (
    <button onClick={handleWriteClick}>
      <Image src="/img/btn-write.png" alt="글 쓰기" width={60} height={60} />
    </button>
  );
}

export default WriteButton;
