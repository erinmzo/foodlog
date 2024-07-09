"use client";
import { useState } from "react";
import Modal from "./Modal";

const ModalButton = () => {
  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState(false);

  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = () => setShowModal(!showModal);

  return (
    <>
      <div
        className="flex flex-col my-auto items-center mt-5"
        onClick={clickModal}
      >
        닉네임 변경
      </div>

      {showModal && <Modal clickModal={clickModal} />}
    </>
  );
};

export default ModalButton;
