"use client";
import { Recommend } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Report } from "notiflix";
import { useState } from "react";

// API에서 랜덤 음식 데이터를 가져오는 함수
export const fetchRandomFood = async (): Promise<Recommend> => {
  const response = await fetch("/api/recommend");
  if (!response.ok) {
    Report.failure("음식 추천에 오류가 있습니다", "잠시 후 다시 시도해주세요.", "확인");
  }
  return response.json();
};

const Random = () => {
  const { data: random, refetch } = useQuery<Recommend>({
    queryKey: ["getRandomFood"],
    queryFn: fetchRandomFood,
    enabled: false,
  });

  const [showFood, setShowFood] = useState(false);

  const handleClick = async () => {
    await refetch();
    setShowFood(true);
  };
  return (
    <div className="w-2/3 flex flex-col items-center mx-auto mb-[80px]">
      <h3 className="text-2xl font-bold">오늘 뭐 먹지?</h3>
      <p className="text-[16px] text-[#878787] mt-2 mb-4">클릭해보세요 메뉴를 추천해드립니다</p>
      <div className="w-full flex flex-col items-center">
        {!showFood && (
          <button className="w-1/2 py-8 text-2xl font-bold text-[#24CAFF] border rounded-md" onClick={handleClick}>
            Click!!
          </button>
        )}
        {showFood && random && (
          <div className="w-full h-full flex flex-col items-center mt-8">
            <h2 className="text-5xl font-bold text-[#24CAFF] mb-4">{random.menu}</h2>
            <div className="w-1/2 max-h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
              <Image src={random.img_url} alt={random.menu} className="w-full h-full object-cover" />
            </div>
            <button
              className="w-1/2 py-2 text-2xl font-bold text-[#24CAFF] border rounded-md my-6"
              onClick={handleClick}
            >
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Random;
