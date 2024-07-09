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
      className="fixed top-0 left-0 w-full h-full flex my-auto justify-center items-center bg-slate-200/90 "
      onClick={clickModal}
    >
      <div
        className="border-2 border-black bg-white w-96 h-64 rounded-lg flex flex-col my-auto justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">프로필 수정</h1>
        <input
          className="border-2 border-black rounded-lg flex items-center text-center mt-5 "
          type="text"
          placeholder="변경할 닉네임"
          onChange={handleChange}
        />
        <div className="mt-5">
          <button onClick={clickModal}>뒤로가기</button>
          <button onClick={clickChange}>변경하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
