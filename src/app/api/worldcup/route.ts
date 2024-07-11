import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  // 모든 음식 데이터를 가져옴
  const supabase = createClient();
  const { data: allFood , error } = await supabase.from("recommend").select("*");
  if (!allFood) {
    return NextResponse.json({ error: "전체 데이터 가져오기 실패" }, { status: 404 });
  }
  return NextResponse.json(allFood);
}