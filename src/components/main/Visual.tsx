import Image from "next/image";

function Visual() {
  return (
    <div className="flex items-center justify-center pt-12 pb-24 bg-[#CEF3FF] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex flex-wrap gap-2 mt-10 items-end justify-center">
        <div className="bounce text-shadow">
          <span className="text-2xl sm:text-4xl md:text-[80px] lg:text-[150px] font-bold leading-none">F</span>
        </div>
        <div className="bounce image-shadow w-12 sm:w-16 md:w-24 lg:w-36">
          <Image
            className="rotate-[-12deg]"
            src="/img/logo-symbol.png"
            alt="로고이미지"
            layout="responsive"
            width={150}
            height={150}
            loading="lazy"
          />
        </div>
        <div className="bounce image-shadow w-10 sm:w-12 md:w-20 lg:w-28">
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
          <span className="text-2xl sm:text-4xl md:text-[80px] lg:text-[150px] font-bold leading-none mr-2">D</span>
        </div>
        <div className="bounce text-shadow">
          <span className="text-2xl sm:text-4xl md:text-[80px] lg:text-[150px] font-bold leading-none">L</span>
        </div>
        <div className="bounce image-shadow w-10 sm:w-12 md:w-20 lg:w-32">
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
          <span className="text-2xl sm:text-4xl md:text-[80px] lg:text-[150px] font-bold leading-none">G</span>
        </div>
      </div>
    </div>
  );
}

export default Visual;
