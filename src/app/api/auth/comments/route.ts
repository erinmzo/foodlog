import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert(info)
      .select();
    if (error) {
      return alert(`${error.message}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "게시물 등록에 실패했습니다." });
  }
}
