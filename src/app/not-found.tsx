import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div>
        <div>
          <div className="speech-bubble">
            <h2 className="text-[30px] text-center font-bold tracking-[2px] text-white">
              404 에러
            </h2>
          </div>
        </div>
        <div>
          {/* <Image
            src="/public/logo-symbol.png"
            alt="로고이미지"
            width={500}
            height={500}
          />
          <Image
            src="/public/logo-symbol.png"
            alt="로고이미지"
            width={500}
            height={500}
          /> */}
          <span>p</span>
          <span>s</span>
          <span className="abc">페이지를 찾을 수 없어요</span>
        </div>
        <Button>Home</Button>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
