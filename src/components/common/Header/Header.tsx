"use client";
import { useAuthStore } from "@/zustand/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    saveUser(null);
    router.push("/");
  };

  return (
    <div className="py-[30px] bg-[#fdfdfd] border-b border-[#F5F5F5]">
      <div className="container mx-auto max-w-[1024px] flex justify-between">
        <Link href="/" className="flex items-center px-5 lg:px-0">
          <Image src="/img/logo-symbol.png" alt="FOOD LOG 로고" width={40} height={40} />
          <h1 className="text-[24px] font-bold ml-2">FOOD LOG</h1>
        </Link>
        {!user ? (
          <ul className="flex items-center justify-end text-[#252525]">
            <li className="px-4">
              <Link href="/login">로그인</Link>
            </li>
            <li>|</li>
            <li className="px-4 py-0">
              <Link href="/join">회원가입</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-end text-[#252525]">
            <li className="px-4">
              <Link href={`/mypage/${user.id}`}>마이페이지</Link>
            </li>
            <li>|</li>
            <li className="px-4 py-0">
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
