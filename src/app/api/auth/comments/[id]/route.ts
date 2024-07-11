import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { paramsId } = await request.json();
    if (!paramsId) {
      return NextResponse.json({ error: "ID 값이 필요합니다." }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase.from("comments").select("*").eq("post_id", paramsId);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." }, { status: 500 });
  }
}
