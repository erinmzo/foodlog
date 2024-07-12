import Image from "next/image";
import React from "react";

function Visual() {
  return (
    <div className="flex items-center justify-center pt-12 pb-24 bg-[#CEF3FF]">
      <div className="flex flex-wrap gap-2 mt-10 items-end justify-center">
        <div className="bounce text-shadow">
          <span className="text-3xl sm:text-[80px] lg:text-[150px] font-bold leading-none">
            F
          </span>
        </div>
        <div className="bounce image-shadow w-16 sm:w-24 lg:w-36">
          <Image
            className="rotate-[-12deg]"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            layout="responsive"
            width={150}
            height={150}
          />
        </div>
        <div className="bounce image-shadow w-12 sm:w-20 lg:w-28">
          <Image
            className="rotate-[12deg]"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            layout="responsive"
            width={110}
            height={110}
          />
        </div>
        <div className="bounce text-shadow">
          <span className="text-3xl sm:text-[80px] lg:text-[150px] font-bold leading-none mr-2">
            D
          </span>
        </div>
        <div className="bounce text-shadow">
          <span className="text-3xl sm:text-[80px] lg:text-[150px] font-bold leading-none">
            L
          </span>
        </div>
        <div className="bounce image-shadow w-12 sm:w-20 lg:w-32">
          <Image
            className="rotate-[20deg]"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            layout="responsive"
            width={130}
            height={130}
          />
        </div>
        <div className="bounce text-shadow">
          <span className="text-3xl sm:text-[80px] lg:text-[150px] font-bold leading-none">
            G
          </span>
        </div>
      </div>
    </div>
  );
}

export default Visual;
