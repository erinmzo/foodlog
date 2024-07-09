import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("store").select("*");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

// export async function POST(request: NextRequest) {
//   try{
  // const supabase = createClient();
  // const { data } = await supabase.from("store").insert([
  //   { address: ,
  //     category: ,
  //     content: ,
  //     img_url: ,
  //     menu_name: ,
  //     order_date: ,
  //     rating: ,
  //     store_name: ,
  //   }
  // ])
  // .select();
  // return NextResponse.json(data);
  // }catch (error) {
  // return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  // }
// }

// export async function DELETE(request: NextRequest) {
//   return NextResponse.json("");
// }
