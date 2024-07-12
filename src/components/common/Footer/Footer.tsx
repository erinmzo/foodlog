"use client";
import { useAuthStore } from "@/zustand/auth";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-[#fdfdfd] border-t border-[#f5f5f5] py-[30px] text-[#878787]">
      <div className="container mx-auto max-w-[1024px] flex flex-col justify-end px-5 lg:px-0">
        <Link href="/" className="flex items-center">
          <Image src="/img/footer-logo.png" alt="FOOD LOG 로고" width={30} height={30} />
          <h2 className="font-bold text-[#878787] ml-2">FOOD LOG</h2>
        </Link>
        <div className="flex justify-between items-end">
          {!user ? (
            <ul className="flex items-center text-[13px]">
              <li className="pr-2">
                <Link href="/login">로그인</Link>
              </li>
              <li>|</li>
              <li className="px-2">
                <Link href="/join">회원가입</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center text-[13px]">
              <li className="pr-2">
                <Link href={`/mypage/${user.id}`}>마이페이지</Link>
              </li>
            </ul>
          )}
          <div className="flex flex-col gap-2 items-end">
            <a href="https://github.com/erinmzo/foodlog" target="_blank">
              <Image src="/img/icon-github.png" alt="github 으로 이동" width={20} height={20} />
            </a>
            <p className="text-[13px] text-right">Copyright Ⓒ1인자 모였조</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
