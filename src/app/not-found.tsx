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
              404 ERROR
            </h2>
          </div>
        </div>
        <div className="flex flex-row gap-[7px] mt-[40px]">
          <div className="flex flex-row gap-[6px]">
            <Image
              className="mt-[auto] rotate-[-12deg] bounce image-shadow"
              src="/img/logo-symbol.png"
              alt="로고이미지"
              width={170}
              height={170}
            />
            <Image
              className="mt-[auto] rotate-[12deg] bounce image-shadow"
              src="/img/logo-symbol.png"
              alt="로고이미지"
              width={130}
              height={130}
            />
          </div>
          <div className="flex items-end gap-[6px]">
            <span className="text-[150px] font-bold leading-none bounce text-shadow">
              p
            </span>
            <span className="text-[150px] font-bold leading-none bounce text-shadow">
              s
            </span>
            <span className="text-[150px] font-bold leading-none bounce text-shadow">
              !
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[50px]">
          <span className="text-[25px] text-[#878787] tracking-[1px] mb-[30px]">
            페이지를 찾을 수 없어요 !
          </span>
          <Button>Go Home</Button>
        </div>
      </div>
    </div>
  );
}
