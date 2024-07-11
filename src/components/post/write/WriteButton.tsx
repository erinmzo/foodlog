"use client";
import { useAuthStore } from "@/zustand/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

function WriteButton() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleWriteClick = () => {
    if (!user) {
      alert("로그인되어야 게시글 작성이 가능합니다.");
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
