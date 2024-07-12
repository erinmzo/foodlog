import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export const getRandomFood = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("recommend").select("*");
  if (error) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};

export async function GET() {
  const randomFood = await getRandomFood();
  if (!randomFood) {
    return NextResponse.json({ error: "데이터 가져오기 실패" }, { status: 404 });
  }
  return NextResponse.json(randomFood);
}