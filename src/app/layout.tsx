import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "푸드로그 | FOOD LOG",
  description: "오늘 먹은 식당과 메뉴를 기록하고 메뉴 추천을 받아보세요~!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-pretendard">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
