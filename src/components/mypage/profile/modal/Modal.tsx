"use client";

import { ChangeEvent, useState } from "react";

type Props = {
  clickModal: () => void;
};

const Modal = (props: Props) => {
  const { clickModal } = props;
  const [nickName, setNickName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);
  const clickChange = async () => {
    console.log(nickName);
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex my-auto justify-center items-center bg-[#00000066]/40 "
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
            onClick={clickChange}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
