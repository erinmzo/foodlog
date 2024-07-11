import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

// 랜덤 음식 데이터를 가져오는 함수
export const getRandomFood = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("recommend").select("*");

  if (error) {
    return null;
  }

  // 데이터 배열의 길이를 이용해 랜덤 인덱스
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};

export async function GET() {
  // 랜덤 음식 데이터를 가져옴
  const randomFood = await getRandomFood();
  if (!randomFood) {
    return NextResponse.json({ error: "데이터 가져오기 실패" }, { status: 404 });
  }
  return NextResponse.json(randomFood);
}

// 모든 음식 데이터 가져오기
export const getAllFood = async () => {
  const supabase = createClient();
  // supabase에서 'recommend' 테이블의 모든 데이터를 선택
  const { data, error } = await supabase.from("recommend").select("*");
  if (error) {
    return [];
  }
  return data;
};

export async function GET_ALL() {
  // 모든 음식 데이터를 가져옴
  const allFood = await getAllFood();
  if (!allFood) {
    return NextResponse.json({ error: "전체 데이터 가져오기 실패" }, { status: 404 });
  }
  return NextResponse.json(allFood);
}