"use client";

import React, { useState } from "react";

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
  const [currentPair, setCurrentPair] = useState<[number, number]>([0, 1]);
  const [winners, setWinners] = useState<Food[]>([]);

  const handleSelect = (winnerIndex: number) => {
    const selectedWinner = currentRound[currentPair[winnerIndex]];
    setWinners((prevWinners) => [...prevWinners, selectedWinner]);

    if (currentPair[1] + 2 < currentRound.length) {
      setCurrentPair([currentPair[0] + 2, currentPair[1] + 2]);
    } else {
      if (currentRound.length === 2) {
        alert(`최종 우승: ${selectedWinner.name}`);
      } else {
        setCurrentRound(winners);
        setCurrentPair([0, 1]); 
        setWinners([]); 
      }
    }
  };

  let currentRoundPairs: Food[] = [];
  if (currentPair[0] < currentRound.length) {
    currentRoundPairs = [currentRound[currentPair[0]], currentRound[currentPair[1]]];
  }

  return (
    <div>
      <h1>음식 월드컵 {currentRound.length}강</h1>
      {currentPair[0] < currentRound.length && (
        <div>
          <div onClick={() => handleSelect(0)}>
            <button>{currentRoundPairs[0]?.name}</button>
          </div>
          <div onClick={() => handleSelect(1)}>
            <button>{currentRoundPairs[1]?.name}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodWorldCup;
