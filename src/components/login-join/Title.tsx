import React from "react";

interface TitleProps {
  title: string;
  content: string;
}

function Title({ title, content }: TitleProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-[24px] font-bold mt-[84px] mb-[10px]">{title}</h2>
      <span className="text-[16px] font-medium text-[#878787] mb-[52px] text-[16px]">
        {content}
      </span>
    </div>
  );
}

export default Title;
