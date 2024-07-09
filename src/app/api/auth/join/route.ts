import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { nickname, email, password } = await request.json();
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nickname,
      },
    },
  });

  if (error) {
    console.log("Error signUp", error.message);
    return Response.json({ message: error.message }, { status: 401 });
  }

  return NextResponse.json("");
}
