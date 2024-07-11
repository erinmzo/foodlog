"use client";

import { Recommend } from "@/types/store";
import { Report } from "notiflix";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const FoodWorldCup = () => {
  const getAllFood = async () => {
    const response = await fetch("/api/worldcup");
    if (!response.ok) {
      Report.failure(
        "음식 추천에 오류가 있습니다",
        "잠시 후 다시 시도해주세요.",
        "확인"
      );
    }
    return response.json();
  };
  const { data: food } = useQuery<Recommend[]>({
    queryKey: ["getAllFood"],
    queryFn: getAllFood,
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
    setSelectedMenuIndex(winnerIndex); // 선택한 메뉴 인덱스 저장

    if (currentPair + 2 < currentRound.length) {
      // 다음 경기 쌍 설정
      setCurrentPair(currentPair + 2);
    } else {
      // 다음 라운드로 이동
      if (currentRound.length === 2) {
        // 최종 우승자 결정 (최종 2강)
        Report.success(`최종 우승: ${selectedWinner.menu}`, "", "확인");
      } else {
        // 다음 라운드의 데이터 수는 현재 라운드의 절반으로 설정
        setCurrentRound([...winners, selectedWinner]); // 승자 배열에 마지막 승자 추가하여 다음 라운드 설정
        setCurrentPair(0); // 다음 라운드의 첫 번째 경기 쌍 인덱스 초기화
        setWinners([]); // 승자 배열 초기화
      }
    }
  };

  // 현재 라운드의 경기 쌍 배열 설정
  let currentRoundPairs: Recommend[] = [];
  if (currentPair < currentRound.length) {
    currentRoundPairs = [
      currentRound[currentPair],
      currentRound[currentPair + 1],
    ];
  }

  const handleReset = () => {
    setCurrentRound(food || []); // 초기 음식 데이터로 설정
    setCurrentPair(0); // 첫 번째 경기 쌍 인덱스로 설정
    setWinners([]); // 승자 배열 초기화
    setSelectedMenuIndex(null); // 선택한 메뉴 인덱스 초기화
  };

  return (
    <div className="w-full flex flex-col items-center text-center mt-[80px]">
      <div className="container max-w-[1024px] mx-auto">
        <h1 className="text-xl font-bold">
          {currentRound.length === 2 ? "결승" : `${currentRound.length}강`}
        </h1>
        <p className="mb-8 text-[16px] text-[#878787]">메뉴를 추천해드립니다</p>
        {currentPair < currentRound.length && (
          <div className="flex mb-8">
            <div
              className="flex flex-1 mx-[40px] text-2xl font-semibold transform hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => handleSelect(0)}
            >
              <button className="w-full text-white relative">
                <Image
                  src={currentRoundPairs[0]?.img_url}
                  alt={currentRoundPairs[0]?.menu}
                  fill
                  className="object-cover mx-auto"
                />
                <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                  {currentRoundPairs[0]?.menu}
                </span>
              </button>
            </div>
            <div
              className="flex flex-1 mx-[40px] text-2xl font-semibold hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => handleSelect(1)}
            >
              <button className="w-full text-white relative">
                <Image
                  src={currentRoundPairs[1]?.img_url}
                  alt={currentRoundPairs[1]?.menu}
                  fill
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
        className="w-1/4 p-4 text-2xl font-bold text-[#24CAFF] border rounded-md"
        onClick={handleReset}
      >
        다시하기
      </button>
    </div>
  );
};

export default FoodWorldCup;
