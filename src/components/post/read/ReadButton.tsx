"use client";

import Button from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface ReadButtonProps {
  id: string;
}

const ReadButton: React.FC<ReadButtonProps> = ({ id }) => {
  const router = useRouter();

  const deleteContents = async (data: { id: string }) => {
    const response = await fetch("http://localhost:3000/api/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const handleDelete = async () => {
    alert("정말 삭제하시겠습니까?")
    try {
      await deleteContents({ id });
      router.push("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  return (
    <div className="w-full flex justify-end mt-[70px] gap-4">
      <Button>
        <Link href={`/post/write/${id}`}>수정하기</Link>
      </Button>
      <button
        className="rounded py-2 px-4 bg-red-400 text-white font-bold"
        onClick={handleDelete}
      >
        삭제하기
      </button>
    </div>
  );
}

export default ReadButton;
