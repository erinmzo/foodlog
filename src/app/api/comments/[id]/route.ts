import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "ID 값이 필요합니다." },
        { status: 400 }
      );
    }

    const supabase = createClient();
    console.log("Supabase client initialized");

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", params.id);

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(error.message);
    }

    console.log("Data retrieved:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Catch block error:", error);
    return NextResponse.json(
      { error: "데이터를 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }
}
