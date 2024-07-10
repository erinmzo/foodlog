"use client";

import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const MyPageProfile = () => {
  const params = useParams();
  const id = params.id;
  const getProfileData = async () => {
    const supabase = createClient();
    const data = await supabase
      .from("profile")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    console.log(data);

    return data;
  };

  const {
    data: profile,
    isPending,
    error,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfileData });
  if (isPending) return <div>Loading...</div>;
  if (error) {
    alert("데이터를 가져오는데 실패했습니다");
    return null;
  }

  return (
    <div className="flex flex-col my-auto items-center mx-3 ">
      <div className="text-5xl mt-24">
        <span className="text-sky-500 text-5xl font-bold">
          {profile.data?.nickname}
        </span>
        님 반갑습니다.
      </div>
    </div>
  );
};

export default MyPageProfile;
