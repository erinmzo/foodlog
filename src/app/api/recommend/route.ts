import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const supabase = createClient();
  const { data, error } = await supabase.from("recommend").select("*");

  if (error) throw error;

  const randomIndex = Math.floor(Math.random() * data.length);

  const randomData = data[randomIndex];

  if (!randomData) {
    return NextResponse.json({ error: "데이터 가져오기 실패" }, { status: 404 });
  }
  return NextResponse.json(randomData);
}
