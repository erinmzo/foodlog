import Button from "@/components/common/Button";

export default function ReadButton() {
  return (
    <div className="w-full flex justify-end mt-[70px] gap-4">
      <Button>수정하기</Button>
      <button className="rounded py-2 px-4 bg-red-400 text-white font-bold">삭제하기</button>
    </div>
  );
}
