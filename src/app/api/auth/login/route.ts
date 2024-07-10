import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const requestUrl = new URL(request.url);
  // const loginUrl = new URL("/", request.url);

  const data = await request.json();
  const email = data.email as string;
  const password = data.password as string;
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error login", error.message);
    return Response.json({ message: error.message }, { status: 401 });
  }

  console.log("Login successful:", user);
  return NextResponse.json(user);
}
