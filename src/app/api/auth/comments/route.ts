import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    console.log("info", info);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert(info)
      .select();
    if (error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "게시물 등록에 실패했습니다." });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     // const { searchParams } = new URL(request.url);
//     // const id = searchParams.get("id");
//     const id = request.json();
//     console.log("id", id);

//     if (!id) {
//       return NextResponse.json(
//         { error: "ID 값이 필요합니다." },
//         { status: 400 }
//       );
//     }

//     const supabase = createClient();
//     const { data, error } = await supabase
//       .from("comments")
//       .select("*")
//       .eq("post_id", id);

//     if (error) {
//       throw new Error(error.message);
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "데이터를 가져오는 데 실패했습니다." },
//       { status: 500 }
//     );
//   }
// }
