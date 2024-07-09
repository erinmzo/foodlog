import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("posts").select("*");
    
    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // 요청 본문에서 데이터 추출
    const supabase = createClient();
    const { data, error } = await supabase.from("posts").insert([body]).select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터를 삽입하는 데 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json("");
}
