import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("posts").select("*");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function POST(request: NextRequest) {
  try{
    const supabase = createClient();
    const { data, error } = await supabase.from("posts").insert(request)
  .select();
  
  if(error) {
    console.log(error);
    return alert(`${error.message}`);
    
    
  }
  return NextResponse.json(data);
  }catch (error) {
    console.log(4);
    
  return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json("");
}
