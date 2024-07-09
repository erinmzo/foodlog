import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Food {
  id: number;
  menu: string;
  img_url: string;
}

// API에서 랜덤 음식 데이터를 가져오는 함수
const fetchRandomFood = async (): Promise<Food> => {
  const response = await fetch('/api/recommend');
  if (!response.ok) {
    throw new Error('Failed to fetch random food');
  }
  return response.json();
};

const Random = () => {
  const { data: random, refetch } = useQuery<Food>({
    queryKey: ['getRandomFood'], 
    queryFn: fetchRandomFood,   
  });

  const handleClick = () => {
    refetch();
  };

  return (
    <div className="flex flex-col items-center mb-[50px]">
      <h3 className="text-2xl font-bold">오늘 뭐 먹지?</h3>
      <p className="text-[16px] text-[#878787] mt-2 mb-4">
        클릭해보세요 메뉴를 추천해드립니다
      </p>
      <button
        className="w-1/3 py-20 text-5xl font-bold text-[#24CAFF] border rounded-md"
        onClick={handleClick}
      >
        Click!!
      </button>
      {random && (
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-5xl font-bold text-[#24CAFF]">{random.menu}</h2>
          <img src={random.img_url} alt={random.menu}/>
        </div>
      )}
    </div>
  );
};

export default Random;
