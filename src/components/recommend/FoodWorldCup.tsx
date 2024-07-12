"use client";

import { Recommend } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Report } from "notiflix";
import { useEffect, useState } from "react";

const FoodWorldCup = () => {
  const getWorldCupFood = async () => {
    const response = await fetch("/api/worldcup");
    if (!response.ok) {
      Report.failure("음식 추천에 오류가 있습니다", "잠시 후 다시 시도해주세요.", "확인");
    }
    return response.json();
  };
  const { data: food } = useQuery<Recommend[]>({
    queryKey: ["getAllFood"],
    queryFn: getWorldCupFood,
  });

  const [currentRound, setCurrentRound] = useState<Recommend[]>([]);
  const [currentPair, setCurrentPair] = useState<number>(0);
  const [winners, setWinners] = useState<Recommend[]>([]);
  const [_, setSelectedMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    if (food) {
      setCurrentRound(food);
    }
  }, [food]);

  const handleSelect = (winnerIndex: number) => {
    const selectedWinner = currentRound[currentPair + winnerIndex];
    setWinners((prevWinners) => [...prevWinners, selectedWinner]);
    setSelectedMenuIndex(winnerIndex);

    if (currentPair + 2 < currentRound.length) {
      // 다음 경기 쌍 설정
      setCurrentPair(currentPair + 2);
    } else {
      if (currentRound.length === 2) {
        Report.success(`최종 우승: ${selectedWinner.menu}`, "", "확인");
      } else {
        setCurrentRound([...winners, selectedWinner]);
        setCurrentPair(0);
        setWinners([]);
      }
    }
  };

  let currentRoundPairs: Recommend[] = [];
  if (currentPair < currentRound.length) {
    currentRoundPairs = [currentRound[currentPair], currentRound[currentPair + 1]];
  }

  const handleReset = () => {
    setCurrentRound(food || []);
    setCurrentPair(0);
    setWinners([]);
    setSelectedMenuIndex(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center pb-[200px]">
      <h1 className="text-[48px] font-bold my-[40px]">푸드 월드컵</h1>
      <div className="container lg:max-w-[1024px] mx-auto px-[20px] lg:px-0">
        <h2 className="text-[24px] font-bold">{currentRound.length === 2 ? "결승" : `${currentRound.length}강`}</h2>
        <p className="mb-14 text-[16px] text-[#878787]">메뉴를 추천해드립니다</p>
        {currentPair < currentRound.length && (
          <div className="flex mb-8 h-[150px] md:h-[300px] lg:h-[450px] gap-x-[40px] justify-center">
            <div
              className="flex  text-2xl font-semibold transform hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => handleSelect(0)}
            >
              <button className=" text-white relative aspect-square">
                <Image
                  src={currentRoundPairs[0]?.img_url}
                  alt={currentRoundPairs[0]?.menu}
                  fill
                  priority
                  className="object-cover mx-auto"
                />
                <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                  {currentRoundPairs[0]?.menu}
                </span>
              </button>
            </div>
            <div
              className="flex text-2xl font-semibold hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => handleSelect(1)}
            >
              <button className="w-full text-white relative aspect-square">
                <Image
                  src={currentRoundPairs[1]?.img_url}
                  alt={currentRoundPairs[1]?.menu}
                  fill
                  priority
                  className="object-cover mx-auto"
                />
                <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                  {currentRoundPairs[1]?.menu}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        className="w-1/4 p-4 mt-6 text-[16px] lg:text-[24px] font-semibold text-[#24CAFF] border rounded-md"
        onClick={handleReset}
      >
        다시하기
      </button>
    </div>
  );
};

export default FoodWorldCup;
