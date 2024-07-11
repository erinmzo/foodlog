import Image from "next/image";
import React from "react";

function Visual() {
  return (
    <div className="flex items-center justify-center pt-[50px] pb-[100px] bg-[#CEF3FF]">
      <div className="flex flex-row gap-[7px] mt-[40px]">
        <div className="flex items-end gap-[6px]">
          <span className="text-[150px] font-bold leading-none bounce text-shadow">
            F
          </span>
          <Image
            className="mt-[auto] rotate-[-12deg] bounce image-shadow"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            width={150}
            height={150}
          />
          <Image
            className="mt-[auto] rotate-[12deg] bounce image-shadow"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            width={110}
            height={110}
          />
          <span className="text-[150px] font-bold leading-none bounce text-shadow mr-[50px]">
            D
          </span>
          <span className="text-[150px] font-bold leading-none bounce text-shadow">
            L
          </span>
        </div>
        <div className="flex flex-row gap-[6px]">
          <Image
            className="mt-[auto] rotate-[20deg] bounce image-shadow"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            width={130}
            height={130}
          />
          <span className="text-[150px] font-bold leading-none bounce text-shadow">
            G
          </span>
        </div>
      </div>
    </div>
  );
}
export default Visual;
