"use client";

import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Report } from "notiflix";

const MyPageProfile = () => {
  const params = useParams();
  const id = params.id;
  const getProfileData = async () => {
    const supabase = createClient();
    const data = await supabase.from("profile").select("*").eq("id", id).maybeSingle();

    return data;
  };

  const { data: profile, isPending, error } = useQuery({ queryKey: ["profile"], queryFn: getProfileData });

  if (isPending) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (error) {
    Report.failure("데이터 로딩 실패", "데이터를 가져오는데 실패했습니다", "확인");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-[24px] sm:text-[48px] px-[15px] lg:px-0">
        <span className="text-[#24CAFF] text-[24px] sm:text-[48px] font-bold">{profile.data?.nickname}</span>님
        반갑습니다.
      </div>
    </div>
  );
};

export default MyPageProfile;
