"use client";
import StorePostCard from "@/components/post/list/StorePostCard";
import { Post } from "@/types/type";
import { useAuthStore } from "@/zustand/auth";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Report } from "notiflix";

function MyPageList() {
  const params = useParams();
  const id = params.id;
  const user = useAuthStore((state) => state.user);

  const getStoreData = async () => {
    const response = await fetch("/api/post", { next: { revalidate: 60 } });
    const data = await response.json();
    return data;
  };

  const { data: posts, isPending, error } = useQuery<Post[]>({ queryKey: ["posts", id], queryFn: getStoreData });

  if (isPending) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (error) {
    Report.failure("데이터 로딩 실패", "데이터를 가져오는데 실패했습니다", "확인");
    return null;
  }

  const filteredPost = posts.filter((post) => {
    return post.user_id === user?.id;
  });

  return (
    <div className="container mx-auto max-w-[1024px] border-t border-[#f5f5f5] pt-[70px] mt-[70px] px-[15px] lg:px-0">
      <h1 className="text-center text-[24px] font-bold">나의 푸드로그</h1>
      {filteredPost && filteredPost.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-16">
          {filteredPost.map((post) => (
            <Link key={post.id} href={`/post/read/${post.id}`}>
              <StorePostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[400px] flex items-center justify-center text-center text-2xl">작성된 게시물이 없습니다.</div>
      )}
    </div>
  );
}

export default MyPageList;
