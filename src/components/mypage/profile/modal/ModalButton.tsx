"use client";
import { useState } from "react";
import Modal from "./Modal";

const ModalButton = () => {
  const [showModal, setShowModal] = useState(false);

  const clickModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col my-auto justify-center items-center">
      <button
        className="rounded py-2 px-4 bg-[#24CAFF] border-[#00BBF7] text-center text-white font-bold mt-5"
        onClick={clickModal}
      >
        닉네임 변경
      </button>

      {showModal && <Modal clickModal={clickModal} />}
    </div>
  );
};

export default ModalButton;
