"use client";

import { createClient } from "@/supabase/client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

type Props = {
  clickModal: () => void;
};

const Modal = (props: Props) => {
  const { clickModal } = props;
  const [nickName, setNickName] = useState("");
  const params = useParams();
  const id = params.id;
  const supabase = createClient();
  const queryClient = useQueryClient();
  // const updateProfileWithSupabase = async (newName, id) => {
  //   const { data: result } = await supabase
  //     .from("profile")
  //     .update(newName)
  //     .eq("id", id);
  //   return result;
  // };
  const getProfileData = async () => {
    const data = await supabase
      .from("profile")
      .select("*")
      .eq("id", id)
      .maybeSingle();

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  const submitChange = async () => {
    // const response = await updateProfileWithSupabase(
    //   nickName,
    //   profile.data?.id
    // );
    // queryClient.invalidateQueries({ queryKey: ["profile"] });

    // alert("프로필 변경이 성공적으로 완료되었습니다!");

    console.log(nickName);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex my-auto justify-center items-center z-40 bg-[#00000066]/40 "
      onClick={clickModal}
    >
      <div
        className="bg-white w-[462px] h-[266px] rounded-[30px] flex flex-col my-auto justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">프로필 수정</h1>
        <input
          className="border-2 border-[#D2D2D2] w-[184px] h-[45px] rounded-[10px] flex items-center text-center mt-5 "
          type="text"
          placeholder="변경할 닉네임"
          onChange={handleChange}
        />
        <div className="mt-5">
          <button
            className="rounded py-2 px-4 bg-[#24CAFF] border-[#00BBF7] text-center text-white font-bold"
            onClick={clickModal}
          >
            뒤로가기
          </button>
          &nbsp;&nbsp;
          <button
            className="rounded py-2 px-4 bg-[#24CAFF] border-[#00BBF7] text-center text-white font-bold"
            onClick={submitChange}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
