import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const loginUrl = new URL("/", request.url);
  // const failedUrl = new URL("/login", request.url);
  // const formData = await request.formData();
  // const email = String(formData.get("email"));
  // const password = String(formData.get("password"));
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

    // return NextResponse.redirect(
    //   `/login?error=${encodeURIComponent(
    //     "아이디와 비밀번호를 정확하게 입력해주세요."
    //   )}`,
    //   { status: 302 }
    // );
  }
  // return NextResponse.redirect(requestUrl.href);

  // console.log(requestUrl);
  // return NextResponse.json(user);
  console.log("Login successful:", user);
  return NextResponse.redirect(loginUrl);
  // } catch (error) {
  // return NextResponse.redirect(requestUrl.href);
  // return NextResponse.json(
  //   { error: "An unexpected error occurred" },
  //   { status: 500 }
  // );
  // }
}
