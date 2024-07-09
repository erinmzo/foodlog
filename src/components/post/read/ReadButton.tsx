import Button from "@/components/common/Button";
import React from "react";

export default function ReadButton() {
  return (
    <div className="flex justify-end mt-4 space-x-2">
      <Button>수정하기</Button>
      <button className="rounded py-2 px-4 bg-red-400 text-white">
        삭제하기
      </button>
    </div>
  );
}
