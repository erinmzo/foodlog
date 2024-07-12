// 쓰지 않으므로 일단 주석처리
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const supabase = createClient();

//     const { data: user } = await supabase
//       .from("profile")
//       .select("*")
//       .eq("id", params.id)
//       .single();
//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
//   }
// }

// export async function POST(request: NextRequest) {
//   return NextResponse.json("");
// }
