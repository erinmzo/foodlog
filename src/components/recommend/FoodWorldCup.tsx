"use client";

import { Report } from "notiflix";
import { useState } from "react";

// 음식 데이터 (이름과 이미지 URL)
interface Food {
  id: number;
  name: string;
}

const foodData: Food[] = [
  { id: 1, name: "짜장면" },
  { id: 2, name: "순두부찌개" },
  { id: 3, name: "김치찌개" },
  { id: 4, name: "비빔밥" },
  { id: 5, name: "불고기" },
  { id: 6, name: "갈비탕" },
  { id: 7, name: "떡볶이" },
  { id: 8, name: "라면" },
  { id: 9, name: "삼겹살" },
  { id: 10, name: "갈비" },
  { id: 11, name: "냉면" },
  { id: 12, name: "만두" },
  { id: 13, name: "쌀국수" },
  { id: 14, name: "카레" },
  { id: 15, name: "파스타" },
  { id: 16, name: "피자" },
];

const FoodWorldCup = () => {
  const [currentRound, setCurrentRound] = useState<Food[]>(foodData);
  const [currentPair, setCurrentPair] = useState<number>(0);
  const [winners, setWinners] = useState<Food[]>([]);

  const handleSelect = (winnerIndex: number) => {
    const selectedWinner = currentRound[currentPair + winnerIndex];
    setWinners((prevWinners) => [...prevWinners, selectedWinner]);

    if (currentPair + 2 < currentRound.length) {
      // 다음 경기 쌍 설정
      setCurrentPair(currentPair + 2);
    } else {
      // 다음 라운드로 이동
      if (currentRound.length === 2) {
        // 최종 우승자 결정 (최종 2강)
        Report.success(`최종 우승: ${selectedWinner.name}`, "", "확인");
      } else {
        // 다음 라운드의 데이터 수는 현재 라운드의 절반으로 설정
        setCurrentRound([...winners, selectedWinner]); // 승자 배열에 마지막 승자 추가하여 다음 라운드 설정
        setCurrentPair(0); // 다음 라운드의 첫 번째 경기 쌍 인덱스 초기화
        setWinners([]); // 승자 배열 초기화
      }
    }
  };

  // 현재 라운드의 경기 쌍 배열 설정
  let currentRoundPairs: Food[] = [];
  if (currentPair < currentRound.length) {
    currentRoundPairs = [currentRound[currentPair], currentRound[currentPair + 1]];
  }

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="w-3/5 mx-auto">
        <h1 className="text-xl font-bold mt-8">{currentRound.length === 2 ? "결승" : `${currentRound.length}강`}</h1>
        <h1 className="text-[16px] text-[#878787]">메뉴를 추천해드립니다</h1>
        {currentPair < currentRound.length && (
          <div className="flex mb-8">
            <div
              className="flex-1 m-4 py-6 text-xl font-semibold bg-[#8bdffc] border hover:bg-[#00BBF7]"
              onClick={() => handleSelect(0)}
            >
              <button className="w-full h-auto text-white">{currentRoundPairs[0]?.name}</button>
            </div>
            <div
              className="flex-1 m-4 py-6 text-xl font-semibold bg-[#8bdffc] border hover:bg-[#00BBF7]"
              onClick={() => handleSelect(1)}
            >
              <button className="w-full h-auto text-white">{currentRoundPairs[1]?.name}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodWorldCup;
