import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    console.log("info", info);
    const supabase = createClient();
    const { data, error } = await supabase.from("comments").insert(info).select();
    if (error) {
      console.error("Supabase insert error:", error); // 에러 로그 출력

      return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "댓글 등록에 실패했습니다." });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const info = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase.from("comments").update({ content: info.content }).eq("id", info.id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "수정에 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const info = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase.from("comments").delete().eq("id", info);
    if (error) {
      return alert(`${error.message}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "삭제에 실패했습니다." });
  }
}
