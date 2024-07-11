"use client";
import { useAuthStore } from "@/zustand/auth";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UserProps {
  user: User | null;
}
function Header({ userSessionInfo }: { userSessionInfo: UserProps }) {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const router = useRouter();
  console.log(userSessionInfo);

  useEffect(() => {
    if (userSessionInfo) {
      saveUser(userSessionInfo.user);
    } else {
      saveUser(null);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    saveUser(null);
    router.push("/");
  };

  return (
    <div className="py-[30px] bg-[#fdfdfd] border-b border-[#F5F5F5]">
      <div className="container mx-auto max-w-[1024px] flex justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex flex-col sm:flex-row items-center px-5 lg:px-0 hover:no-underline">
            <Image src="/img/logo-symbol.png" alt="FOOD LOG 로고" width={40} height={40} />
            <h1 className="text-[0px] sm:text-[24px] font-bold ml-2">FOOD LOG</h1>
          </Link>
          <Link href="/worldcup" className="ml-[15px] lg:ml-[80px] hover:underline">
            <h1>푸드 월드컵</h1>
          </Link>
        </div>
        {!user ? (
          <ul className="flex items-center justify-end text-[#252525]">
            <li className="px-1 sm:px-4">
              <Link href="/login" className="hover:underline">
                로그인
              </Link>
            </li>
            <li>|</li>
            <li className="px-1 sm:px-4 py-0">
              <Link href="/join" className="hover:underline">
                회원가입
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-end text-[#252525]">
            <li className="px-1 sm:px-4 py-0">
              <Link href={`/mypage/${user.id}`} className="hover:underline">
                마이페이지
              </Link>
            </li>
            <li>|</li>
            <li className="px-1 sm:px-4 py-0">
              <button className="hover:underline" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
