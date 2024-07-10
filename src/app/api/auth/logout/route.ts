import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error login", error.message);
    return Response.json({ message: error.message }, { status: 401 });
  }
  return NextResponse.json("로그아웃이 되었습니다.");
}
