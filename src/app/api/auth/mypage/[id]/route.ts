import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    const { data: user } = await supabase
      .from("profile")
      .select("*")
      .eq("id", params.id)
      .single();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
} //유저 데이터

export async function POST(request: NextRequest) {
  return NextResponse.json("");
} //아마 닉네임변경
