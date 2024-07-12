"use client";

import Button from "@/components/common/Button";
import { Post } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
interface ReadButtonProps {
  postsId: string;
}

const ReadButton = ({ posts }: { posts: Post }) => {
  const { id, user_id } = posts;
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isWriter = user?.user_metadata.sub === user_id;

  const deletePost = async (data: { id: string }) => {
    const response = await fetch("/api/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const handleDelete = () => {
    Confirm.show(
      "게시물 삭제",
      "정말로 삭제하시겠습니까?",
      "Yes",
      "No",
      async () => {
        try {
          await deletePost({ id });
          router.push("/");
        } catch (error) {
          console.error("Failed to delete the post:", error);
        }

        Notify.success("삭제되었습니다.");
      },
      () => {
        Notify.info("삭제가 취소되었습니다.");
      }
    );
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
