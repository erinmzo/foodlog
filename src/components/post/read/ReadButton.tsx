"use client";

import Button from "@/components/common/Button";
import { Post } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface ReadButtonProps {
  postsId: string;
}

const ReadButton = ({ posts }: { posts: Post }) => {
  const { id, user_id } = posts;
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isWriter = user?.user_metadata.sub === user_id;

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
    alert("정말 삭제하시겠습니까?");
    try {
      await deleteContents({ id });
      router.push("/");
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  return (
    <div>
      {isWriter && (
        <div className="w-full flex justify-end mt-[70px] gap-4">
          <Button>
            <Link href={`/post/write/${id}`}>수정하기</Link>
          </Button>
          <button className="rounded py-2 px-4 bg-red-400 text-white font-bold" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadButton;
