import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("");
} //유저 데이터

export async function POST(request: NextRequest) {
  return NextResponse.json("");
} //아마 닉네임변경
